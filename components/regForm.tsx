"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

interface MentorData {
  clerkId: string;
  name: string;
  email: string;
  bio: string;
  image: string;
  oneLiner: string;
  upiId: string;
  tags: string[];
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
  });
  const { user } = useUser();

  const [tagInput, setTagInput] = useState("");

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
    if (
      !formData.name ||
      !formData.email ||
      !formData.bio ||
      !formData.image ||
      !formData.oneLiner ||
      !formData.upiId
    ) {
      console.error("All fields are required");
      return;
    }
    const clerkId = user?.id || "";
    const email = user?.emailAddresses[0]?.emailAddress || "";
    if (!clerkId || !email) {
      console.error("Clerk ID or email is missing");
      return;
    }

    if (formData.email !== email) {
      console.error("Email mismatch");
      return;
    }

    formData.clerkId = clerkId;

    console.log("Submitting:", formData);
    // TODO: Submit to backend API
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
      });
      setTagInput("");
      alert("Mentor registered successfully!");
      window.location.replace("/");
      // Handle success (e.g., show a success message, redirect, etc.)
    } else {
      console.error("Error:", response.statusText);
      // Handle error (e.g., show an error message)
    }
    // Reset form after submission
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
          onChange={handleInputChange}
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
        <Label>Image URL</Label>
        <Input
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
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

      {/* Tags Field */}
      <div>
        <Label>PoRs / Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Add tag (e.g., E-Cell, Cfi, Nocode Club)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddTag())
            }
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
