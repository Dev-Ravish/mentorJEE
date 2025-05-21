// components/ProfileCard.tsx
import React from 'react';
import { Mentor } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';

interface ProfileCardProps {
    mentor: Mentor;
}

const ProfileCard = ({ mentor }: ProfileCardProps) => {
    const { name, initials, college, branch, year, imageUrl } = mentor;

    return (
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
        <div className="flex items-center gap-4">
            {imageUrl ? (
            <Image
                src={imageUrl}
                alt={name}
                className="w-14 h-14 rounded-full object-cover"
            />
            ) : (
            <div className="w-14 h-14 bg-[#E6ECFF] text-[#2F2D9E] flex items-center justify-center rounded-full text-lg font-bold">
                {initials}
            </div>
            )}
            <div>
            <h2 className="text-lg font-semibold text-[#2F2D9E]">{name}</h2>
            <p className="text-sm text-gray-600">{branch} - {college}</p>
            <p className="text-xs text-gray-500">{year}</p>
            </div>
        </div>

        <div className="mt-4 flex gap-2">
            <Button className="bg-[#2F2D9E] hover:bg-[#3f3dc4] text-white flex-1 text-sm">
            Book a Call
            </Button>
            <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className="border-[#2F2D9E] text-[#2F2D9E] text-sm flex-1">
                View More
                </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-md ">
                <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                    {branch}, {college} — {year}
                </DialogDescription>
                </DialogHeader>
                <div className="mt-4 text-sm text-gray-700">
                This mentor has guided over 200 students and has a rating of 4.9/5. You can ask about academics, campus life, and preparation strategies.
                </div>
            </DialogContent>
            </Dialog>
        </div>
        </div>
    );
};

export default ProfileCard;
