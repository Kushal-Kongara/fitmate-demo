// src/app/api/vapi/start/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  return NextResponse.json({ ok: true, method: 'GET' });
}

export async function POST(_: NextRequest) {
  return NextResponse.json({ ok: true, method: 'POST' });
}
