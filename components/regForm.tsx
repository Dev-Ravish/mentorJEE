"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface MentorData {
  clerkId: string;
  name: string;
  email: string;
  bio: string;
  image: string;
  oneLiner: string;
  upiId: string;
  tags: string[];
  college: string;
  department: string;
  calendlyUrl?: string; 
}

export default function MentorRegistrationForm() {
  const [formData, setFormData] = useState<MentorData>({
    clerkId: "",
    name: "",
    email: "",
    bio: "",
    image: "",
    oneLiner: "",
    upiId: "",
    tags: [],
    college: "",
    department: "",
    calendlyUrl: "", 
  });
  const { user } = useUser();
  const [tagInput, setTagInput] = useState("");

  // Auto-fill email and clerkId once user is loaded
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.emailAddresses[0]?.emailAddress || "",
        clerkId: user.id,
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "email",
      "bio",
      "image",
      "oneLiner",
      "upiId",
      "college",
      "department",
      "calendlyUrl", 
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof MentorData]) {
        console.error(`Missing field: ${field}`);
        return;
      }
    }

    if (!user?.id || !user?.emailAddresses[0]?.emailAddress) {
      console.error("Clerk ID or email is missing");
      return;
    }

    if (formData.email !== user.emailAddresses[0]?.emailAddress) {
      console.error("Email mismatch");
      return;
    }

    console.log("Submitting:", formData);
    const response = await fetch("/api/mentorRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      setFormData({
        clerkId: "",
        name: "",
        email: "",
        bio: "",
        image: "",
        oneLiner: "",
        upiId: "",
        tags: [],
        college: "",
        department: "",
        calendlyUrl: "", 
      });
      setTagInput("");
      alert("Mentor registered successfully!");
      window.location.replace("/");
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#2F2D9E]">Mentor Registration</h2>

      <div>
        <Label>Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          readOnly
          required
        />
      </div>

      <div>
        <Label>One-liner (e.g., AIR 345, IIT Delhi)</Label>
        <Input
          name="oneLiner"
          value={formData.oneLiner}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label>College</Label>
        <Input
          name="college"
          value={formData.college}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label>Department</Label>
        <Input
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label>Bio</Label>
        <Textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows={4}
          required
        />
      </div>

      <div>
        <Label>Image</Label>
        <CldUploadWidget
          signatureEndpoint="/api/signCloudinaryParams"
          onSuccess={(result) => {
            let imageUrl = "";
            if (
              result.info &&
              typeof result.info !== "string" &&
              "secure_url" in result.info
            ) {
              imageUrl = result.info.secure_url as string;
            }
            setFormData((prev) => ({
              ...prev,
              image: imageUrl,
            }));
          }}
          onQueuesEnd={(_, { widget }) => {
            widget.close();
          }}
        >
          {({ open }) => {
            const handleOnClick = () => open();
            return (
              <button type="button" onClick={handleOnClick}>
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>

        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Mentor"
              
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}
      </div>

      <div>
        <Label>UPI ID (for payment)</Label>
        <Input
          name="upiId"
          value={formData.upiId}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label>Calendly URL (for slot booking)</Label>
        <Input
          name="calendlyUrl"
          value={formData.calendlyUrl}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label>PoRs / Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Add tag (e.g., E-Cell, Cfi, Nocode Club)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button type="button" onClick={handleAddTag}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#CBD1FF] text-[#2F2D9E] px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-xs ml-1"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="bg-[#2F2D9E] hover:bg-[#3f3dc4] text-white"
      >
        Submit
      </Button>
    </form>
  );
}
