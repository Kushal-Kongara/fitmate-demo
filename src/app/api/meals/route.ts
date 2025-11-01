import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!  // server-side key
);

export async function POST(req: NextRequest) {
  try {
    const { user_id, text_entry, image_url } = await req.json();

    if (!user_id || (!text_entry && !image_url)) {
      return NextResponse.json({ error: 'user_id and meal text or image required' }, { status: 400 });
    }

    // 1) Save meal
    const { data: meal, error: mealErr } = await admin
      .from('meals').insert({ user_id, text_entry, image_url }).select('*').single();
    if (mealErr) return NextResponse.json({ error: mealErr.message }, { status: 400 });

    // 2) AI draft (short, kind, practical)
    const prompt = `User meal: "${text_entry || 'image meal'}".
Write as a supportive health coach:
- praise 1 specific thing
- suggest 1 tiny tweak
- propose 1 micro-habit for next time
Max 60 words. No judgment.`;
    const r = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    });
    const aiDraft = r.choices[0]?.message?.content?.trim() || 'Nice choice! Consider a small tweak next time.';

    // 3) Save draft
    const { data: fb, error: fbErr } = await admin
      .from('feedback').insert({ meal_id: meal.id, ai_draft: aiDraft }).select('*').single();
    if (fbErr) return NextResponse.json({ error: fbErr.message }, { status: 400 });

    return NextResponse.json({ meal, feedback: fb });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
