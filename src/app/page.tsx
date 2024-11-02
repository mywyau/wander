"use client";

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
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find your work location</h1>

        <form onSubmit={handleSubmit} className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Enter location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            // Change w-full to w-96 or use another width
          />
          <button
            type="submit"
            className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </main>
  );
}
