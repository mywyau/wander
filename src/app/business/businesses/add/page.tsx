"use client";

import AppConfig from "@/config/AppConfig";
import React, { useState } from "react";
import AddressSearch from "./components/AddressSearch";
import TextInput from "./components/TextInput";

// Define interfaces
interface Business {
    name: string;
    description?: string;
    street: string;
    city: string;
    postcode: string;
    contactEmail: string;
    contactPhone: string;
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
        street: "",
        city: "",
        postcode: "",
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

    const handleAddressSelect = (data: { address: string; location: { lat: number; lng: number }; components: { street: string; city: string; postcode: string } }) => {
        setFormData((prev) => ({
            ...prev,
            street: data.components.street,
            city: data.components.city,
            postcode: data.components.postcode,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submission triggered.");

        // Validate the form
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Business name is required.";
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
            console.log("Business data ready to be submitted:", formData);

            fetch(`http://${AppConfig.baseUrl}//api/Businesss`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to add Business.");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Business successfully created:", data);
                    // Clear the form after successful submission
                    setFormData({
                        name: "",
                        description: "",
                        street: "",
                        city: "",
                        postcode: "",
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
                    console.error("Error creating Business:", err);
                });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Add an Business</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Name */}

                <TextInput
                    id="name"
                    name="name"
                    label="Business Name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Enter the Business name"
                    error={errors.name}
                />

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

                <AddressSearch onSelect={handleAddressSelect} />

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
