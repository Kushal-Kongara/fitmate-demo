import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );
}

export async function GET() {
  const admin = getSupabaseAdmin();
  // Try order by created_at (now exists). If someone copied older schema, we still fallback by id.
  const { data, error } = await admin
    .from('feedback')
    .select('id, meal_id, ai_draft, final_message, sent_at, created_at, meals:meal_id (text_entry, created_at)')
    .is('sent_at', null)
    .order('created_at', { ascending: false })   // safe now
    .limit(1);

  if (error || !data?.[0]) return NextResponse.json({});
  return NextResponse.json(data[0]);
}
