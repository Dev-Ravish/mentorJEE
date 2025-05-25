'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="bg-[#F6F8FE] text-gray-900">
      {/* Hero Section */}
      <section className="bg-[#2F2D9E] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Talk to Seniors. Get the Real Fundaes. for around a $.
            </h1>
            <p className="mt-6 text-lg text-[#CBD1FF]">
              Book a chill 1-on-1 call with students from IITs, Ask anything — JEE prep, branches, college life, or just random advice.

            </p>
            <div className="mt-6 flex gap-4">
              <Button className="bg-white text-[#2F2D9E] hover:bg-gray-100"><a href='/mentors'>Browse Seniors</a></Button>
              <Button variant="outline" className="text-[#2F2D9E] border-white hover:bg-[#b3b2ff]"><a href='#how-it-works'>Register</a></Button>
            </div>
            <div className="mt-10 flex gap-8 text-[#CBD1FF] text-sm">
              <div>
                <p className="font-semibold text-white text-xl">500+</p>
                Verified Seniors
              </div>
              <div>
                <p className="font-semibold text-white text-xl">15k+</p>
                Calls Completed
              </div>
              <div>
                <p className="font-semibold text-white text-xl">98%</p>
                Satisfaction Rate
              </div>
              <div>
                <p className="font-semibold text-white text-xl">30+</p>
                Top Colleges
              </div>
            </div>
          </div>
          <div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white" id='how-it-works'>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-[#F6F8FE] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Find Your Senior</h3>
              <p className="text-gray-600">Scroll through profiles. Pick someone from your dream college or branch.</p>
            </div>
            <div className="bg-[#F6F8FE] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Book a Slot</h3>
              <p className="text-gray-600"> Pay ~1$ and lock in a 30-minute call — no waiting.</p>
            </div>
            <div className="bg-[#F6F8FE] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Hop on the Call</h3>
              <p className="text-gray-600">Get the unfiltered truth — no gyaan, just real fundaes from someone who’s been there.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Mentors */}
  

      {/* Additional Section Placeholder for Second Half */}
      <section className="py-20 px-4 bg-[#F6F8FE]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Be a Wattzy Senior?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-[#F6F8FE] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Earn While You Learn</h3>
              <p className="text-gray-600">Side Hustle, Sorted</p>
            </div>
            <div className="bg-[#F6F8FE] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Be the Senior You Wish You Had</h3>
              <p className="text-gray-600">Help juniors who are just as confused as you once were.</p>
            </div>
            <div className="bg-[#F6F8FE] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Meet Cool People</h3>
              <p className="text-gray-600">Talk to future IITians & NITians. Who knows — maybe they’ll be your juniors someday.</p>
            </div>
          </div>
          <div className="mt-10">
            <Button className="bg-[#2F2D9E] text-white hover:bg-[#3f3dc4]"><a href='/mentor-onboarding'>Become a Senior</a></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
