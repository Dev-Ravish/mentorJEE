// /app/api/getMentorByEmail/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  try {
    const mentor = await prisma.mentor.findUnique({ where: { email } });
    if (!mentor) return NextResponse.json({ error: 'Mentor not found' }, { status: 404 });
    return NextResponse.json(mentor);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}