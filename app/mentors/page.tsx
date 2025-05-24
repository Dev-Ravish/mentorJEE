'use client';
import React, { useEffect, useState } from 'react';
// import { mentors } from '@/lib/mentorData';
import ProfileCard from '@/components/profileCard';

export default function MentorsPage() {

    const [mentorData, setMentorData] = useState([]);
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await fetch('/api/getMentors');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setMentorData(data);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        };
        fetchMentors();
    }, []);


    return (
        <div className="h-full px-6 py-8 bg-gray-50">
        {mentorData && <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Meet Our Mentors
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mentorData.map((mentor, index) => (
                <ProfileCard key={index} mentor={mentor} />
            ))}
            </div>
        </div>}
        </div>
    );
};

