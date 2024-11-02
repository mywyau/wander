"use client";

import { Workspace } from "@/app/models/Workspace";
import { useState } from "react";

export default function AddWorkspaceForm() {
  // Use a single state object to hold all workspace data
  const [workspaceData, setWorkspaceData] =
    useState<Workspace>({
      name: "",
      location: "",
      hourPrice: 0,
      dayPrice: 0,
      weekPrice: 0,
      monthPrice: 0,
      annualPrice: 0,
    });

  const [message, setMessage] = useState("");

  // Handler for updating workspace data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setWorkspaceData((prevData) => ({
      ...prevData,
      [id]: id.endsWith("Price") ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/cashew/workspaces/add", {
      method: "POST",
      body: JSON.stringify(workspaceData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage("Workspace added successfully");
      setWorkspaceData({
        name: "",
        location: "",
        hourPrice: 0,
        dayPrice: 0,
        weekPrice: 0,
        monthPrice: 0,
        annualPrice: 0,
      });
    } else {
      setMessage("Error adding workspace");
    }
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded-md shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Workspace</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Workspace Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Workspace Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Workspace Name"
            value={workspaceData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            value={workspaceData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price Inputs */}
        {["hourPrice", "dayPrice", "weekPrice", "monthPrice", "annualPrice"].map(
          (priceType) => (
            <div key={priceType}>
              <label
                htmlFor={priceType}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {priceType
                  .replace("Price", " Price")
                  .replace(/(\B[A-Z])/g, " $1")}{" "}
                {/* Format the label */}
              </label>
              <input
                type="number"
                id={priceType}
                placeholder={`Price per ${priceType.replace("Price", "").toLowerCase()
                  }`}
                value={workspaceData[priceType as keyof Workspace]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add Workspace
        </button>
      </form>

      {/* Success/Error Message */}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
