'use client'

import { Button } from '@/components/ui/button'
import {  SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, SignUp, SignUpButton, useUser } from '@clerk/nextjs'

export default function MentorOnboarding() {
    const { user } = useUser()
    console.log(user)

    function isValidMentor() {
        const email = user?.emailAddresses[0]?.emailAddress || '';
        if (email.endsWith('@gmail.com')) {
            return false;
        } else{
            return true;
        }
    }


    return (
        <div>
            <SignedOut>
               <div>
                    <div className='flex flex-col items-center justify-center min-h-screen'>
                        <h1 className='text-2xl font-bold mb-4'>Welcome to MentorJee!</h1>
                        <p className='mb-4'>Please sign in to continue.</p>
                        <SignInButton mode="modal" >
                            <Button className='bg-red-600 hover:bg-red-500'>Sign In</Button>
                        </SignInButton>
                        <p className='mt-4'>Don&apos;t have an account? <SignUpButton mode="modal"><Button>Sign Up</Button></SignUpButton></p>
                    </div>
                        
               </div>
            </SignedOut>
            <SignedIn>
               { isValidMentor() ? (
                    <div>
                        <div className='flex flex-col items-center justify-center min-h-screen'>
                            <h1 className='text-2xl font-bold mb-4'>Welcome to MentorJee!</h1>
                            <p className='mb-4'>We are excited to have you on board as a mentor.</p>
                            <p className='mb-4'>Please fill out the form below to complete your onboarding process.</p>
                            <SignOutButton >
                                <Button className='bg-red-600 hover:bg-red-500 '>Sign Out</Button>
                            </SignOutButton>
                            {/* Add your onboarding form here */}
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center min-h-screen'>
                        <h1 className='text-2xl font-bold mb-4'>Sorry {user?.firstName}! you cannot be onboarded as our mentor. Please try logging In using college email id.</h1>
                        <SignOutButton >
                            <Button className='bg-red-600 hover:bg-red-500'>Sign Out</Button>
                        </SignOutButton>
                    </div>
                )}
            </SignedIn>
        </div>


    )
}
