"use client";

import React, { useState } from "react";

// Define interfaces
interface Business {
  name: string;
  description?: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  website?: string;
  openingHours: {
    days: string[];
    startTime: string; // ISO 8601 string
    endTime: string; // ISO 8601 string
  };
}

const AddBusinessPage = () => {
  const [formData, setFormData] = useState<Partial<Business>>({
    name: "",
    description: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    website: "",
    openingHours: {
      days: [],
      startTime: "",
      endTime: "",
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent] as object), [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAvailabilityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours!,
        days: checked
          ? [...(prev.openingHours!.days || []), value]
          : prev.openingHours!.days?.filter((day) => day !== value) || [],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submission triggered.");

    // Validate the form
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Business name is required.";
    if (!formData.address1) newErrors.street = "Address 1 is required.";
    if (!formData.address2) newErrors.street = "Address 2 is required.";
    if (!formData.address3) newErrors.street = "Address 3 is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.postcode) newErrors.postcode = "Postcode is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email address is required.";
    if (!formData.openingHours?.days?.length)
      newErrors.openingHours = "Select at least one opening day.";
    if (!formData.openingHours?.startTime)
      newErrors.startTime = "Opening start time is required.";
    if (!formData.openingHours?.endTime)
      newErrors.endTime = "Closing end time is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Business data ready to be submitted:", formData);

      fetch(`http://localhost:8080/api/business`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add business.");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Business successfully created:", data);
          // Clear the form after successful submission
          setFormData({
            name: "",
            description: "",
            address1: "",
            address2: "",
            address3: "",
            city: "",
            postcode: "",
            phone: "",
            email: "",
            website: "",
            openingHours: {
              days: [],
              startTime: "",
              endTime: "",
            },
          });
        })
        .catch((err) => {
          console.error("Error creating business:", err);
        });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add a Business</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
        </div>

        {/* Address  1 */}
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Address 1
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.address1}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
        </div>

        {/* Address 2 */}
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Address 2
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.address2}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
        </div>

        {/* Address 3*/}
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Address 3
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.address3}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
        </div>


        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
            {errors.postcode && <p className="text-red-500 text-sm">{errors.postcode}</p>}
          </div>
        </div>

        {/* Contact */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website (Optional)
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
        </div>

        {/* Opening Hours */}
        <div>
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700">Opening Hours</legend>
            <div className="flex gap-4 mt-2">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    value={day}
                    checked={formData.openingHours?.days.includes(day)}
                    onChange={handleAvailabilityCheckboxChange}
                    className="mr-2"
                  />
                  {day}
                </label>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="mt-4">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="openingHours.startTime"
                  value={formData.openingHours?.startTime}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md"
                />
                {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
              </div>
              <div className="mt-4">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="openingHours.endTime"
                  value={formData.openingHours?.endTime}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md"
                />
                {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
              </div>
            </div>
          </fieldset>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Add Business
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusinessPage;
