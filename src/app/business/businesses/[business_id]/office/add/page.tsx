"use client";

import AppConfig from "@/config/AppConfig";
import React, { useState } from "react";
import AddressSearch from "./components/AddressSearch";
import NumberInput from "./components/NumberInput";
import TextInput from "./components/TextInput";
import { AddressDetails, Office } from "./types/OfficeInterfaces";
import SelectField from "./components/SelectInputField";


const AddOfficePage = () => {

    const [formData, setFormData] = useState<Partial<Office>>(
        {
            officeId: "",
            officeSpecs: {
                id: 0,
                businessId: "",
                officeId: "",
                officeName: "",
                description: "",
                officeType: "",
                numberOfFloors: 0,
                totalDesks: 0,
                capacity: 0,
                amenities: [],
                availability: {
                    days: [],
                    startTime: "",
                    endTime: "",
                },
                rules: "",
                createdAt: "",
                updatedAt: "",
            },
            addressDetails: {
                id: 0,
                businessId: "",
                officeId: "",
                buildingName: "",
                floorNumber: "",
                street: "",
                city: "",
                country: "",
                county: "",
                postcode: "",
                latitude: 0,
                longitude: 0,
                createdAt: "",
                updatedAt: "",
            },
            contactDetails: {
                id: 0,
                businessId: "",
                officeId: "",
                primaryContactFirstName: "",
                primaryContactLastName: "",
                contactEmail: "",
                contactNumber: "",
                createdAt: "",
                updatedAt: "",
            },
            availability: {
                days: [],
                startTime: "",
                endTime: "",
            },
            createdAt: "",
            updatedAt: "",
        }
    );


    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
    
        // Handle nested keys with dot notation (e.g., "addressDetails.street")
        if (name.includes(".")) {
            const keys = name.split("."); // Split by dot notation, e.g., ["addressDetails", "street"]
    
            setFormData((prev) => {
                let updated = { ...prev }; // Start with a shallow copy of the current state
                let currentLevel = updated;
    
                // Traverse and create nested objects dynamically
                for (let i = 0; i < keys.length - 1; i++) {
                    const key = keys[i];
                    if (!currentLevel[key]) {
                        currentLevel[key] = {}; // Create nested objects if they don't exist
                    }
                    currentLevel = currentLevel[key];
                }
    
                // Update the final key
                currentLevel[keys[keys.length - 1]] = value;
    
                return updated;
            });
        } else {
            // Handle top-level keys (e.g., "officeName")
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    


    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setFormData((prev) => {

            const updatedAmenities = prev.officeSpecs?.amenities || [];

            switch (checked) {
                case true: // Checkbox is checked
                    return {
                        ...prev,
                        officeSpecs: {
                            ...prev.officeSpecs,
                            amenities: [...updatedAmenities, value],
                        },
                    };

                case false: // Checkbox is unchecked
                    return {
                        ...prev,
                        officeSpecs: {
                            ...prev.officeSpecs,
                            amenities: updatedAmenities.filter((amenity) => amenity !== value),
                        },
                    };

                default:
                    return prev; // No change
            }
        });
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

    const handleAddressSelect = (
        data: {
            address: string;
            location: { lat: number; lng: number };
            components: { street: string; city: string; postcode: string }
        }
    ) => {

        setFormData((prev) => (
            {
                ...prev,
                addressDetails: {
                    ...(prev.addressDetails as AddressDetails), // Ensure existing data aligns with the interface
                    street: data.components.street,
                    city: data.components.city,
                    postcode: data.components.postcode,
                    latitude: data.location.lat,
                    longitude: data.location.lng
                }
            }
        ));
    };

    const validateForm = (formData: Partial<Office>) => {
        const newErrors: { [key: string]: string } = {};

        // Validate officeSpecs
        const requiredOfficeSpecsFields = ["officeName", "description", "officeType", "numberOfFloors", "capacity", "amenities", "availability", "rules"];
        requiredOfficeSpecsFields.forEach((field) => {
            if (!formData.officeSpecs?.[field as keyof typeof formData.officeSpecs]) {
                newErrors[field] = `${field} is required.`;
            }
        });

        // Validate addressDetails
        const requiredAddressFields = ["buildingName", "floorNumber", "street", "city", "country", "county", "postcode"];
        requiredAddressFields.forEach((field) => {
            if (!formData.addressDetails?.[field as keyof typeof formData.addressDetails]) {
                newErrors[field] = `${field} is required.`;
            }
        });

        // Validate contactDetails
        const requiredContactFields = ["primaryContactFirstName", "primaryContactLastName", "contactEmail", "contactNumber"];
        requiredContactFields.forEach((field) => {
            if (!formData.contactDetails?.[field as keyof typeof formData.contactDetails]) {
                newErrors[field] = `${field} is required.`;
            }
        });

        return newErrors;
    };


    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        console.log("Form submission triggered.");

        const newErrors = validateForm(formData);
        setErrors(newErrors); // Update errors in state

        if (Object.keys(newErrors).length === 0) {
            console.log("Office data ready to be submitted:", formData);

            fetch(`http://${AppConfig.baseUrl}/api/offices`, {
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
                    setFormData(
                        {
                            officeId: "",
                            officeSpecs: {
                                id: 0,
                                businessId: "",
                                officeId: "",
                                officeName: "",
                                description: "",
                                officeType: "",
                                numberOfFloors: 0,
                                totalDesks: 0,
                                capacity: 0,
                                amenities: [],
                                availability: {
                                    days: [],
                                    startTime: "",
                                    endTime: "",
                                },
                                rules: "",
                                createdAt: "",
                                updatedAt: "",
                            },
                            addressDetails: {
                                id: 0,
                                businessId: "",
                                officeId: "",
                                buildingName: "",
                                floorNumber: "",
                                street: "",
                                city: "",
                                country: "",
                                county: "",
                                postcode: "",
                                latitude: 0,
                                longitude: 0,
                                createdAt: "",
                                updatedAt: "",
                            },
                            contactDetails: {
                                id: 0,
                                businessId: "",
                                officeId: "",
                                primaryContactFirstName: "",
                                primaryContactLastName: "",
                                contactEmail: "",
                                contactNumber: "",
                                createdAt: "",
                                updatedAt: "",
                            },
                            availability: {
                                days: [],
                                startTime: "",
                                endTime: "",
                            },
                            createdAt: "",
                            updatedAt: "",
                        }
                    );
                    setErrors({});
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

                <TextInput
                    id="officeName"
                    name="officeSpecs.officeName"
                    label="Office Name"
                    value={formData.officeSpecs?.officeName || ""}
                    onChange={handleChange}
                    placeholder="Enter the office name"
                    error={errors.officeName}
                />

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="officeSpecs.description"
                        value={formData.officeSpecs?.description}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                </div>

                <SelectField
                    id="officeSpecs.officeType"
                    name="officeSpecs.officeType" // Correctly set the nested name
                    label="Office Type"
                    value={formData.officeSpecs?.officeType || ""}
                    onChange={handleChange}
                    options={[
                        { value: "ExecutiveOffice", label: "Executive Office" },
                        { value: "OpenPlanOffice", label: "Open-plan Office" },
                        { value: "PrivateOffice", label: "Private Office" }
                    ]}
                    error={errors.officeType}
                />


                <AddressSearch onSelect={handleAddressSelect} />

                {/* Floors and Total Desks */}
                <div className="grid grid-cols-3 gap-6">
                    <NumberInput
                        id="officeSpecs.numberOfFloors"
                        name="officeSpecs.numberOfFloors"
                        label="Number of Floors"
                        value={formData.officeSpecs?.numberOfFloors}
                        onChange={handleChange}
                        min={1}
                        error={errors.floors}
                    />

                    <NumberInput
                        id="officeSpecs.totalDesks"
                        name="officeSpecs.totalDesks"
                        label="Total Desks"
                        value={formData.officeSpecs?.totalDesks}
                        onChange={handleChange}
                        min={1}
                        error={errors.totalDesks}
                    />

                    <NumberInput
                        id="officeSpecs.capacity"
                        name="officeSpecs.capacity"
                        label="Capacity"
                        value={formData.officeSpecs?.capacity}
                        onChange={handleChange}
                        min={1}
                        error={errors.capacity}
                    />
                </div>

                {/* Contact Information */}
                <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        id="contactDetails.contactEmail"
                        name="contactDetails.contactEmail"
                        value={formData.contactDetails?.contactEmail}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                    {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail}</p>}
                </div>

                <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                        Contact Phone
                    </label>
                    <input
                        type="tel"
                        id="contactDetails.contactNumber"
                        name="contactDetails.contactNumber"
                        value={formData.contactDetails?.contactNumber}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border rounded-md"
                    />
                    {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
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
                                    checked={formData.officeSpecs?.amenities?.includes(amenity)}
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
                                        checked={formData.officeSpecs?.availability?.days.includes(day)}
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
                                    name="officeSpecs.availability.startTime"
                                    value={formData.officeSpecs?.availability?.startTime}
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
                                    name="officeSpecs.availability.endTime"
                                    value={formData.officeSpecs?.availability?.endTime}
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
