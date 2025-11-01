import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    // fetch recent meals
    const { data: meals } = await admin
      .from('meals')
      .select('eaten_at, text_entry')
      .eq('user_id', userId)
      .order('eaten_at', { ascending: true })
      .limit(20);

    const mealList = (meals ?? []).map(m => ({ t: m.eaten_at, text: m.text_entry }));
    const prompt = `You are a supportive health coach.
Given recent meals with timestamps: ${JSON.stringify(mealList)}
Identify ONE recurring pattern (time/day/context) and propose ONE tiny, testable experiment for next week.
Keep it kind and specific. Max 70 words.`;

    const r = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    });
    const text = r.choices[0]?.message?.content?.trim() || 'Try one small prep habit this week.';

    // compute Monday-start for current week
    const d = new Date();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    const weekStart = monday.toISOString().slice(0, 10);

    const { data: inserted, error } = await admin.from('weekly_patterns').insert({
      user_id: userId, week_start: weekStart, summary: text, experiment_suggestion: text
    }).select('*').single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ pattern: inserted });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
