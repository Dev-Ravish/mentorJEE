// pages/mentors.tsx or components/MentorsPage.tsx
import React from 'react';
import { mentors } from '@/lib/mentorData';
import ProfileCard from '@/components/profileCard';

export default function MentorsPage() {
    return (
        <div className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Meet Our Mentors
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mentors.map((mentor, index) => (
                <ProfileCard key={index} mentor={mentor} />
            ))}
            </div>
        </div>
        </div>
    );
};

