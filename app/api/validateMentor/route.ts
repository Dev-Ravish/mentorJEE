import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const mentor = await prisma.mentor.findUnique({
        where: { email },
    })

    if (mentor) {
        return NextResponse.json({ exists: true }, { status: 200 })
    } else {
        return NextResponse.json({ exists: false }, { status: 404 })
    }
}
