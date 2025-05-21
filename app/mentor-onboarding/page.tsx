'use client'

import {  SignIn, SignUp, useUser } from '@clerk/nextjs'

export default function MentorOnboarding() {
    const { user } = useUser()

    if (!user) return <div className='flex flex-col items-center justify-center min-h-svh'>
        <SignUp />
    </div>

    return <div>Welcome!</div>
}