import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );
}

// (optional) keep this if you added it for debugging; also unwrap params
export async function GET(_: NextRequest, context: { params: Promise<{ mealId: string }> }) {
  const { mealId } = await context.params;
  return NextResponse.json({ ok: true, mealId });
}

export async function POST(_: NextRequest, context: { params: Promise<{ mealId: string }> }) {
  const { mealId } = await context.params; // ✅ unwrap the Promise
  const admin = getSupabaseAdmin();

  const { data: fbRow, error: fbErr } = await admin
    .from('feedback')
    .select('*')
    .eq('meal_id', mealId)
    .is('sent_at', null)
    .single();

  if (fbErr || !fbRow) {
    return NextResponse.json({ error: 'No draft to send' }, { status: 404 });
  }

  const now = new Date().toISOString();
  const { data, error } = await admin
    .from('feedback')
    .update({ final_message: fbRow.ai_draft, sent_at: now, coach_id: null })
    .eq('id', fbRow.id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ sent: true, feedback: data });
}
