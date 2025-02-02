"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchPage() {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to the results page with the search query as a URL parameter
    if (searchQuery.trim()) {
      router.push(`/results?location=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find your work location</h1>
        <form onSubmit={handleSubmit} className="mb-6 flex justify-center">

          <Input
            type="text"
            placeholder="Enter location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="shadowNoBorder"
            className="w-1/3" // Set width
          />

          <Button
            type="submit"
            variant="default"
            className="ml-4 hover:bg-softBlue"
          >
            Search
          </Button>
        </form>
      </div>
    </main>
  );
}
