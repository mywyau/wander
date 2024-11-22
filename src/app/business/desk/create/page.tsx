"use client";

import React, { useState } from "react";

// Define interfaces
interface Availability {
    days: string[];
    startTime: string; // ISO 8601 string
    endTime: string; // ISO 8601 string
}

interface DeskListingRequest {
    business_id: string;
    workspace_id: string;
    title: string;
    description?: string;
    desk_type: string;
    quantity: number;
    price_per_hour: number;
    price_per_day: number;
    rules?: string;
    features: string[];
    availability: Availability;
    created_at: string;
    updated_at: string;
}

const DeskPage = () => {
    const [formData, setFormData] = useState<Partial<DeskListingRequest>>({
        business_id: "business_123", // Replace with dynamic data if needed
        workspace_id: "workspace_456", // Replace with dynamic data if needed
        title: "",
        description: "",
        desk_type: "PrivateDesk",
        quantity: 0,
        price_per_hour: 0,
        price_per_day: 0,
        rules: "",
        features: [],
        availability: {
            days: [],
            startTime: "",
            endTime: "",
        },
        created_at: new Date().toISOString().slice(0, 19),
        updated_at: new Date().toISOString().slice(0, 19),
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
            availability: {
                ...prev.availability!,
                days: checked
                    ? [...(prev.availability!.days || []), value]
                    : prev.availability!.days?.filter((day) => day !== value) || [],
            },
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            features: checked
                ? [...(prev.features || []), value]
                : prev.features?.filter((feature) => feature !== value) || [],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submission triggered.");

        // Validate the form
        const newErrors: { [key: string]: string } = {};
        if (!formData.title) newErrors.title = "Title is required.";
        if (!formData.price_per_hour)
            newErrors.price_per_hour = "Price per hour is required.";
        if (!formData.quantity || formData.quantity < 1)
            newErrors.quantity = "Quantity must be at least 1.";
        if (!formData.availability?.days?.length)
            newErrors.availability = "Select at least one available day.";
        if (!formData.availability?.startTime)
            newErrors.startTime = "Start time is required.";
        if (!formData.availability?.endTime)
            newErrors.endTime = "End time is required.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Parse startTime and endTime strings into valid Date objects
            const parseTime = (time: string): Date => {
                const [hours, minutes] = time.split(":").map(Number);
                const date = new Date();
                date.setHours(hours, minutes, 0, 0); // Set time, keep current date
                return date;
            };

            const formattedStartTime = parseTime(formData.availability!.startTime);
            const formattedEndTime = parseTime(formData.availability!.endTime);

            console.log("Formatted start time:", formattedStartTime.toString());
            console.log("Formatted end time:", formattedEndTime.toString());

            // Prepare data
            const deskData: DeskListingRequest = {
                business_id: formData.business_id!,
                workspace_id: formData.workspace_id!,
                title: formData.title!,
                description: formData.description || "",
                desk_type: formData.desk_type!,
                quantity: formData.quantity!,
                price_per_hour: formData.price_per_hour!,
                price_per_day: formData.price_per_day!,
                rules: formData.rules || "",
                features: formData.features || [],
                availability: {
                    ...formData.availability!,
                    startTime: formattedStartTime.toISOString().slice(0, 19),
                    endTime: formattedEndTime.toISOString().slice(0, 19)
                },
                created_at: formData.created_at!,
                updated_at: formData.updated_at!,
            };

            console.log("Preparing data for submission...");
            console.log("Desk data to send:", deskData);

            console.time("API Request Duration");
            // Send data to API
            fetch(`http://localhost:8080/cashew/business/desk/listing/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(deskData),
            })
                .then((res) => {
                    console.timeEnd("API Request Duration");
                    if (!res.ok) {
                        console.error("Request failed:", res.statusText);
                        throw new Error(`API error: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Desk successfully created:", data);
                })
                .catch((err) => {
                    console.error("Error creating desk:", err);
                })
                .finally(() => {
                    console.log("Request completed at:", new Date().toISOString());
                });
        } else {
            console.log("Preparing data for submission...");
            console.log("Desk data errors found:", errors);
            console.log("startTime:", formData.availability?.startTime);
            console.log("endTime:", formData.availability?.endTime);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Create a Desk Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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

                {/* Desk Type */}
                <div>
                    <label htmlFor="desk_type" className="block text-sm font-medium text-gray-700">
                        Desk Type
                    </label>
                    <select
                        id="desk_type"
                        name="desk_type"
                        value={formData.desk_type}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    >
                        <option value="PrivateDesk">Private Desk</option>
                        <option value="SharedDesk">Shared Desk</option>
                        <option value="HotDesk">Hot Desk</option>
                        <option value="StandingDesk">Standing Desk</option>
                    </select>
                </div>

                {/* Availability */}
                <div>
                    <fieldset>
                        <legend className="block text-sm font-medium text-gray-700">
                            Availability
                        </legend>
                        <div className="flex gap-4 mt-2">
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                <label key={day} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={day}
                                        checked={formData.availability?.days.includes(day)}
                                        onChange={handleAvailabilityCheckboxChange}
                                        className="mr-2"
                                    />
                                    {day}
                                </label>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-1/3">
                            {/* Start Time */}
                            <div className="mt-4">
                                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    id="startTime"
                                    name="availability.startTime"
                                    value={formData.availability?.startTime}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-4 py-2 border rounded-md"
                                />
                                {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
                            </div>
                            {/* End Time */}
                            <div className="mt-4">
                                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    id="endTime"
                                    name="availability.endTime"
                                    value={formData.availability?.endTime}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-4 py-2 border rounded-md"
                                />
                                {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
                            </div>
                        </div>
                    </fieldset>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price_per_hour" className="block text-sm font-medium text-gray-700">
                            Price Per Hour (£)
                        </label>
                        <input
                            type="number"
                            id="price_per_hour"
                            name="price_per_hour"
                            value={formData.price_per_hour}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="price_per_day" className="block text-sm font-medium text-gray-700">
                            Price Per Day (£)
                        </label>
                        <input
                            type="number"
                            id="price_per_day"
                            name="price_per_day"
                            value={formData.price_per_day}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                </div>

                {/* Features */}
                <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">Features</legend>
                    <div className="flex gap-4 mt-2">
                        {["Wi-Fi", "Power Outlets", "Monitor", "Desk Lamp", "Coffee"].map((feature) => (
                            <label key={feature} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={feature}
                                    checked={formData.features?.includes(feature)}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                {feature}
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* Rules */}
                <div>
                    <label htmlFor="rules" className="block text-sm font-medium text-gray-700">
                        Rules
                    </label>
                    <textarea
                        id="rules"
                        name="rules"
                        value={formData.rules}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                        Create Desk
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeskPage;
