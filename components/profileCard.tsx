"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Mentor {
  name?: string;
  email?: string;
  bio?: string;
  image?: string;
  oneLiner?: string;
  upiId?: string;
  tags: string[];
  college?: string;
  department?: string;

}

interface ProfileCardProps {
  mentor: Mentor;
}

export default function ProfileCard({ mentor }: ProfileCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-2xl bg-[#F3F4FF] border border-[#CBD1FF] shadow-md">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#2F2D9E]">
          {mentor.image ? (
            <img
              src={mentor.image}
              alt="Mentor Image"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-[#E6ECFF] text-[#2F2D9E] flex items-center justify-center rounded-full text-lg font-bold">
              RK
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-[#2F2D9E]">{mentor.name}</h3>
        <p className="text-sm text-gray-800 mb-2">{mentor.department}, {mentor.college}</p>
        
        <p className="text-sm text-muted-foreground mb-2">{mentor.oneLiner}</p>

        <div className="flex flex-wrap justify-center gap-2 my-2">
          {mentor.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#CBD1FF] text-[#2F2D9E] px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button className="bg-[#2F2D9E] hover:bg-[#3f3dc4] text-white">
            Book a Call
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">More Info</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-md">
              <DialogHeader>
                <DialogTitle>{mentor.name}</DialogTitle>
                <DialogDescription>{mentor.oneLiner}</DialogDescription>
              </DialogHeader>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-muted-foreground">
                  {mentor.bio || "No bio provided."}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {mentor.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#CBD1FF] text-[#2F2D9E] px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
