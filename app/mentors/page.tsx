'use client';
import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/profileCard';

export default function MentorsPage() {
    const [mentorData, setMentorData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await fetch('/api/getMentors');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMentorData(data);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMentors();
    }, []);

    return (
        <div className="h-full px-6 py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Meet Our Seniors
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        <span className="ml-2 text-gray-500">Loading mentors...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {mentorData.length > 0 ? (
                            mentorData.map((mentor, index) => (
                                <ProfileCard key={index} mentor={mentor} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">No mentors available at the moment.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
