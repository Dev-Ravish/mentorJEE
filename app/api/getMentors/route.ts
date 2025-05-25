import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mentors = await prisma.mentor.findMany();
    
    if (!mentors || mentors.length === 0) {
      return NextResponse.json({ message: 'No mentors found' }, { status: 404 });
    }

    const cleanedMentors = mentors.map(({ upiId, calendlyUrl, clerkId, ...rest }) => rest);

    return NextResponse.json(cleanedMentors, { status: 200 });

  } catch (error) {
    console.error('Error fetching mentors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
