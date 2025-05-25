import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { name, email, bio, oneLiner, upiId, tags, college, department, calendlyUrl } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required for update' }, { status: 400 });
        }

        const mentor = await prisma.mentor.update({
            where: { email },
            data: {
                name,
                bio,
                oneLiner,
                upiId,
                tags,
                college,
                department,
                calendlyUrl,
            },
        });

        return NextResponse.json(mentor, { status: 200 });

    } catch (error) {
        console.error('Error editing mentor details:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}