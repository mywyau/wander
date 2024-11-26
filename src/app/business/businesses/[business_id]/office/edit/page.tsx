"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Office {
    id: string;
    name: string;
    address: string;
    city: string;
    postcode: string;
    floors: number;
    totalDesks: number;
    amenities: string[];
    contactEmail: string;
    contactPhone: string;
}

const EditOfficePage = ({ params }: { params: { officeId: string } }) => {
    const router = useRouter();
    const { officeId } = params; // Get the office ID from the route parameter

    // State to manage form data and errors
    const [formData, setFormData] = useState<Partial<Office>>({
        id: officeId,
        name: "",
        address: "",
        city: "",
        postcode: "",
        floors: 0,
        totalDesks: 0,
        amenities: [],
        contactEmail: "",
        contactPhone: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch office details (Simulating an API call with hardcoded data)
    useEffect(() => {
        const fetchOfficeDetails = async () => {
            try {
                // Simulate fetching office data
                const officeData: Office = {
                    id: officeId,
                    name: "Capgemini HQ",
                    address: "123 Desk Lane",
                    city: "New York",
                    postcode: "10001",
                    floors: 5,
                    totalDesks: 50,
                    amenities: ["Wi-Fi", "Coffee", "Power Outlets"],
                    contactEmail: "hq@capgemini.com",
                    contactPhone: "07402205071",
                };

                // Update the form with fetched data
                setFormData(officeData);
            } catch (err) {
                setError("Failed to fetch office details.");
            } finally {
                setLoading(false);
            }
        };

        fetchOfficeDetails();
    }, [officeId]);

    // Handle form changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Office name is required.";
        if (!formData.address) newErrors.address = "Address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.postcode) newErrors.postcode = "Postcode is required.";
        if (!formData.contactEmail) newErrors.contactEmail = "Contact email is required.";
        if (!formData.contactPhone) newErrors.contactPhone = "Contact phone is required.";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                console.log("Submitting updated office data:", formData);

                // Simulate an API call to update office data
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

                alert("Office updated successfully!");
                router.push(`/businesses/${formData.id}/offices`); // Navigate back to the offices page
            } catch (err) {
                console.error("Error updating office:", err);
                setError("Failed to update office.");
            }
        }
    };

    if (loading) return <p>Loading office details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Edit Office</h1>
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

                {/* Amenities */}
                <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">Amenities</legend>
                    <div className="flex gap-4 mt-2">
                        {["Wi-Fi", "Coffee", "Power Outlets", "Air Conditioning"].map((amenity) => (
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

export default EditOfficePage;
