import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, bio, image, oneLiner, upiId, tags, clerkId } = body;

    if (!name || !email || !bio || !image || !oneLiner || !upiId || !tags || !clerkId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const mentor = await prisma.mentor.create({
      data: {
        name,
        email,
        bio,
        image,
        oneLiner,
        upiId,
        clerkId,
        tags, 
      },
    });

    return NextResponse.json(mentor, { status: 201 });
  } catch (error) {
    console.error('Error creating mentor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
