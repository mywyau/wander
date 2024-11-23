"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Business {
    id: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    postcode: string;
    contactEmail: string;
    contactPhone: string;
}

const EditBusinessPage = ({ params }: { params: { businessId: string } }) => {
    const router = useRouter();
    const { businessId } = params; // Get the business ID from the route parameter

    // State for form data and errors
    const [formData, setFormData] = useState<Partial<Business>>({
        id: businessId,
        name: "",
        description: "",
        address: "",
        city: "",
        postcode: "",
        contactEmail: "",
        contactPhone: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch business details (Simulating API call with hardcoded data)
    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                // Simulate fetching business data
                const businessData: Business = {
                    id: businessId,
                    name: "Capgemini",
                    description: "A leading consultancy firm.",
                    address: "123 Desk Lane",
                    city: "New York",
                    postcode: "10001",
                    contactEmail: "contact@capgemini.com",
                    contactPhone: "07402205071",
                };

                // Update form data with fetched details
                setFormData(businessData);
            } catch (err) {
                setError("Failed to fetch business details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessDetails();
    }, [businessId]);

    // Handle form changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Business name is required.";
        if (!formData.address) newErrors.address = "Address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.postcode) newErrors.postcode = "Postcode is required.";
        if (!formData.contactEmail) newErrors.contactEmail = "Contact email is required.";
        if (!formData.contactPhone) newErrors.contactPhone = "Contact phone is required.";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                console.log("Submitting updated business data:", formData);

                // Simulate an API call to update business data
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

                alert("Business updated successfully!");
                router.push("/businesses"); // Navigate back to the businesses page
            } catch (err) {
                console.error("Error updating business:", err);
                setError("Failed to update business.");
            }
        }
    };

    if (loading) return <p>Loading business details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Edit Business</h1>
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

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
                    {errors.contactEmail && (
                        <p className="text-red-500 text-sm">{errors.contactEmail}</p>
                    )}
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
                    {errors.contactPhone && (
                        <p className="text-red-500 text-sm">{errors.contactPhone}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBusinessPage;
