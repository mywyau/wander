"use client";

import React, { useState } from "react";

// Define interfaces
interface Office {
    name: string;
    description?: string;
    street: string;
    city: string;
    postcode: string;
    floors: number;
    totalDesks: number;
    amenities: string[];
    contactEmail: string;
    contactPhone: string;
    openingHours: {
        days: string[];
        startTime: string; // ISO 8601 string
        endTime: string; // ISO 8601 string
    };
}

const AddOfficePage = () => {
    const [formData, setFormData] = useState<Partial<Office>>({
        name: "",
        description: "",
        street: "",
        city: "",
        postcode: "",
        floors: 0,
        totalDesks: 0,
        amenities: [],
        contactEmail: "",
        contactPhone: "",
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

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            amenities: checked
                ? [...(prev.amenities || []), value]
                : prev.amenities?.filter((amenity) => amenity !== value) || [],
        }));
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
        if (!formData.name) newErrors.name = "Office name is required.";
        if (!formData.street) newErrors.street = "Street address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.postcode) newErrors.postcode = "Postcode is required.";
        if (!formData.contactEmail) newErrors.contactEmail = "Contact email is required.";
        if (!formData.contactPhone) newErrors.contactPhone = "Contact phone is required.";
        if (!formData.openingHours?.days?.length)
            newErrors.openingHours = "Select at least one opening day.";
        if (!formData.openingHours?.startTime)
            newErrors.startTime = "Opening start time is required.";
        if (!formData.openingHours?.endTime)
            newErrors.endTime = "Closing end time is required.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Office data ready to be submitted:", formData);

            fetch(`http://localhost:8080/api/offices`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to add office.");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Office successfully created:", data);
                    // Clear the form after successful submission
                    setFormData({
                        name: "",
                        description: "",
                        street: "",
                        city: "",
                        postcode: "",
                        floors: 0,
                        totalDesks: 0,
                        amenities: [],
                        contactEmail: "",
                        contactPhone: "",
                        openingHours: {
                            days: [],
                            startTime: "",
                            endTime: "",
                        },
                    });
                })
                .catch((err) => {
                    console.error("Error creating office:", err);
                });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Add an Office</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Office Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Office Name
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

                {/* Address */}
                <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                        Street Address
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
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

                {/* Floors and Total Desks */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="floors" className="block text-sm font-medium text-gray-700">
                            Number of Floors
                        </label>
                        <input
                            type="number"
                            id="floors"
                            name="floors"
                            value={formData.floors}
                            onChange={handleChange}
                            min="1"
                            className="w-full mt-1 px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="totalDesks" className="block text-sm font-medium text-gray-700">
                            Total Desks
                        </label>
                        <input
                            type="number"
                            id="totalDesks"
                            name="totalDesks"
                            value={formData.totalDesks}
                            onChange={handleChange}
                            min="1"
                            className="w-full mt-1 px-4 py-2 border rounded-md"
                        />
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                    {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail}</p>}
                </div>
                <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                        Contact Phone
                    </label>
                    <input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                    {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone}</p>}
                </div>

                {/* Amenities */}
                <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">Amenities</legend>
                    <div className="flex gap-4 mt-2">
                        {["Wi-Fi", "Power Outlets", "Monitor", "Coffee", "Air Conditioning"].map((amenity) => (
                            <label key={amenity} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={amenity}
                                    checked={formData.amenities?.includes(amenity)}
                                    onChange={handleAmenitiesChange}
                                    className="mr-2"
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </fieldset>

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
                        Add Office
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddOfficePage;
