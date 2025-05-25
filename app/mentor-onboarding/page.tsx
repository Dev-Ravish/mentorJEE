"use client";

import MentorRegistrationForm from "@/components/regForm";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function MentorOnboarding() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [isMentor, setIsMentor] = useState(false);

  function isValidMentor() {
    const email = user?.emailAddresses[0]?.emailAddress || "";
    return !email.endsWith("@gmail.com"); // Only allow non-Gmail
  }

  async function checkIfMentor(email: string) {
    try {
      const res = await fetch(
        `/api/validateMentor?email=${encodeURIComponent(email)}`
      );
      return res.status === 200;
    } catch (err) {
      console.error("Error checking mentor status:", err);
      return false;
    }
  }

  // ✅ useEffect to run the check when component mounts
  useEffect(() => {
    async function fetchMentorStatus() {
      if (!user) return;
      const email = user?.emailAddresses[0]?.emailAddress || "";
      const result = await checkIfMentor(email);
      setIsMentor(result);
      setLoading(false);
    }

    if (user) {
      fetchMentorStatus();
    }
  }, [user]);

  return (
    <div className=" h-full py-8">
      <SignedOut>
        <div className="flex flex-col items-center justify-center h-full py-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to MentorJee!</h1>
          <p className="mb-4">Please sign in to continue.</p>
          <SignInButton mode="modal">
            <Button className="bg-red-600 hover:bg-red-500">Sign In</Button>
          </SignInButton>
          <p className="mt-4">
            Don&apos;t have an account?{" "}
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </p>
        </div>
      </SignedOut>

      <SignedIn>
        {!isValidMentor() ? (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">
              Sorry {user?.firstName}! You cannot be onboarded as our mentor.
              Please try logging in using a college email ID.
            </h1>
            <SignOutButton>
              <Button className="bg-red-600 hover:bg-red-500">Sign Out</Button>
            </SignOutButton>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center  h-full py-8">
            <h1 className="text-xl font-medium text-gray-600">
              Checking mentor status...
            </h1>
          </div>
        ) : isMentor ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <h1 className="text-2xl font-bold mb-4">
              You are already registered as a mentor!
            </h1>
            <Button className="bg-blue-600 hover:bg-blue-500">
              {" "}
              <a href="/update-mentordata">Update Profile</a>
            </Button>
          </div>
        ) : (
          <MentorRegistrationForm />
        )}
      </SignedIn>
    </div>
  );
}
