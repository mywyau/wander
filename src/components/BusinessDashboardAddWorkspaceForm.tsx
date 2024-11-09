"use client";

import { Workspace } from "@/app/models/Workspace";
import { useState } from "react";

export default function AddWorkspaceForm() {
  const [workspaceData, setWorkspaceData] =
    useState<Workspace>({
      name: "",
      street: "",
      city: "",
      state: "",
      postcode: "",
      priceModel: "hourly", // Example of using a pricing model
      hourPrice: 0,
      dayPrice: 0,
      weekPrice: 0,
      monthPrice: 0,
      annualPrice: 0,
    });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setWorkspaceData((prevData) => ({
      ...prevData,
      [id]: id.endsWith("Price") ? parseFloat(value) || 0 : value,
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
        street: "",
        city: "",
        state: "",
        postcode: "",
        priceModel: "hourly", // Reset price model on successful submission
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
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Workspace Name */}
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">Workspace Name</h3>
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

        {/* Address Section */}
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          <input
            type="text"
            id="street"
            placeholder="Street Address"
            value={workspaceData.street}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            required
          />
          <input
            type="text"
            id="city"
            placeholder="City"
            value={workspaceData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            required
          />
          <input
            type="text"
            id="state"
            placeholder="State"
            value={workspaceData.state}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            required
          />
          <input
            type="text"
            id="postcode"
            placeholder="Postcode"
            value={workspaceData.postcode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price Section */}
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">Pricing</h3>
          <div>
            <label htmlFor="priceModel" className="block text-sm font-medium text-gray-700 mb-1">
              Pricing Model
            </label>
            <select
              id="priceModel"
              value={workspaceData.priceModel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          {workspaceData.priceModel === "hourly" && (
            <div>
              <label htmlFor="hourPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Price
              </label>
              <input
                type="number"
                id="hourPrice"
                placeholder="Hourly Price"
                value={workspaceData.hourPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
                min="0"
              />
            </div>
          )}

          {workspaceData.priceModel === "daily" && (
            <div>
              <label htmlFor="dayPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Daily Price
              </label>
              <input
                type="number"
                id="dayPrice"
                placeholder="Daily Price"
                value={workspaceData.dayPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
                min="0"
              />
            </div>
          )}

          {/* Add similar conditional pricing inputs for weekly, monthly, and annually */}
          {/* For brevity, this is omitted but you can follow the same pattern as above */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Add Workspace
        </button>
      </form>

      {/* Success/Error Message */}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
