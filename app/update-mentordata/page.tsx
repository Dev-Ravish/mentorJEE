"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateMentorProfile() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    oneLiner: "",
    upiId: "",
    tags: "",
    college: "",
    department: "",
    calendlyUrl: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const email = user?.emailAddresses[0]?.emailAddress;
        const res = await fetch(`/api/getMentorByEmail?email=${email}`);
        const data = await res.json();

        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          image: data.image || "",
          oneLiner: data.oneLiner || "",
          upiId: data.upiId || "",
          tags: data.tags?.join(", ") || "",
          college: data.college || "",
          department: data.department || "",
          calendlyUrl: data.calendlyUrl || "",
          email: data.email || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching mentor info:", err);
        toast.error("Failed to load profile.");
      }
    };

    if (user) {
      fetchMentor();
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/editMentorDetails", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        router.push("/mentors");
      } else {
        const error = await res.json();
        toast.error(error?.error || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading your profile...</div>;
  }

  return (
    <div>
      <SignedOut>hello</SignedOut>
      <SignedIn>
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Update Your Mentor Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>One-liner</Label>
              <Input
                name="oneLiner"
                value={formData.oneLiner}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>UPI ID</Label>
              <Input
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>College</Label>
              <Input
                name="college"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Department</Label>
              <Input
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Calendly URL</Label>
              <Input
                name="calendlyUrl"
                value={formData.calendlyUrl}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Update Profile
            </Button>
          </form>
        </div>
      </SignedIn>
    </div>
  );
}
