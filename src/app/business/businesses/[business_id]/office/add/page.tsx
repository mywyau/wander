"use client";

import React, { useState } from "react";
import AddOfficeButton from "./components/AddOfficeButton";
import AddressSearch from "./components/AddressSearch";
import AmenitiesCheckbox from "./components/AmenitiesCheckbox";
import NumberInput from "./components/NumberInput";
import OpeningHours from "./components/OpeningHours";
import SelectField from "./components/SelectInputField";
import TextArea from "./components/TextArea";
import TextInput from "./components/TextInput";
import { AddressDetails, Office } from "./types/OfficeInterfaces";


const AddOfficePage = () => {

    const [formData, setFormData] = useState<Partial<Office>>(
        {
            officeId: "office_1",
            officeSpecs: {
                id: 1,
                businessId: "business_1",
                officeId: "office_1",
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
                createdAt: new Date().toISOString().slice(0, 19),
                updatedAt: new Date().toISOString().slice(0, 19),
            },
            addressDetails: {
                id: 1,
                businessId: "business_1",
                officeId: "office_1",
                buildingName: "",
                floorNumber: "",
                street: "",
                city: "",
                country: "",
                county: "",
                postcode: "",
                latitude: 0,
                longitude: 0,
                createdAt: new Date().toISOString().slice(0, 19),
                updatedAt: new Date().toISOString().slice(0, 19),
            },
            contactDetails: {
                id: 1,
                businessId: "business_1",
                officeId: "office_1",
                primaryContactFirstName: "",
                primaryContactLastName: "",
                contactEmail: "",
                contactNumber: "",
                createdAt: new Date().toISOString().slice(0, 19),
                updatedAt: new Date().toISOString().slice(0, 19),
            },
            createdAt: new Date().toISOString().slice(0, 19),
            updatedAt: new Date().toISOString().slice(0, 19),
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

    const handleNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
    
        // Parse the input value to a number, default to 0 if invalid
        const parsedValue = parseFloat(value) || 0;
    
        if (name.includes(".")) {
            const keys = name.split("."); // Handle nested keys with dot notation
            setFormData((prev) => {
                let updated = { ...prev };
                let currentLevel = updated;
    
                // Traverse and create nested objects dynamically
                for (let i = 0; i < keys.length - 1; i++) {
                    const key = keys[i];
                    if (!currentLevel[key]) {
                        currentLevel[key] = {};
                    }
                    currentLevel = currentLevel[key];
                }
    
                // Update the final key
                currentLevel[keys[keys.length - 1]] = parsedValue;
    
                return updated;
            });
        } else {
            // For top-level keys
            setFormData((prev) => ({ ...prev, [name]: parsedValue }));
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


    const handleAvailabilityCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            officeSpecs: {
                ...prev.officeSpecs,
                availability: {
                    ...prev.officeSpecs?.availability,
                    days: checked
                        ? [...(prev.officeSpecs?.availability?.days || []), value]
                        : prev.officeSpecs?.availability?.days?.filter((day) => day !== value) || [],
                },
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

        console.log("Form errors:", newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Office data ready to be submitted:", formData);

            // Parse startTime and endTime strings into valid ISO 8601 format
            const parseTimeToISO = (time: string): string => {
                const [hours, minutes] = time.split(":").map(Number);
                const date = new Date();
                date.setHours(hours, minutes, 0, 0); // Set hours and minutes, keep today's date
                return date.toISOString(); // Convert to ISO 8601 string
            };

            const formattedStartTime = formData.officeSpecs?.availability?.startTime
                ? parseTimeToISO(formData.officeSpecs.availability.startTime)
                : null;

            const formattedEndTime = formData.officeSpecs?.availability?.endTime
                ? parseTimeToISO(formData.officeSpecs.availability.endTime)
                : null;

            // Add formatted times back into the form data
            const formattedFormData = {
                ...formData,
                officeSpecs: {
                    ...formData.officeSpecs,
                    availability: {
                        ...formData.officeSpecs?.availability,
                        startTime: formattedStartTime?.slice(0, 19),
                        endTime: formattedEndTime?.slice(0, 19),
                    },
                },
            };

            console.log("Formatted form data before sending:", formattedFormData);

            fetch(`http://localhost:1010/pistachio/business/businesses/office/listing/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedFormData),
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
                        officeId: "",
                        officeSpecs: {
                            id: 1,
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
                            createdAt: new Date().toISOString().slice(0, 19),
                            updatedAt: new Date().toISOString().slice(0, 19),
                        },
                        addressDetails: {
                            id: 1,
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
                            createdAt: new Date().toISOString().slice(0, 19),
                            updatedAt: new Date().toISOString().slice(0, 19),
                        },
                        contactDetails: {
                            id: 1,
                            businessId: "",
                            officeId: "",
                            primaryContactFirstName: "",
                            primaryContactLastName: "",
                            contactEmail: "",
                            contactNumber: "",
                            createdAt: new Date().toISOString().slice(0, 19),
                            updatedAt: new Date().toISOString().slice(0, 19),
                        },
                        createdAt: new Date().toISOString().slice(0, 19),
                        updatedAt: new Date().toISOString().slice(0, 19),
                    });

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

                <TextInput
                    type="text"
                    id="officeName"
                    name="officeSpecs.officeName"
                    label="Office Name"
                    value={formData.officeSpecs?.officeName || ""}
                    onChange={handleChange}
                    placeholder="Enter the office name"
                    error={errors.officeName}
                />

                <TextArea
                    id="description"
                    name="officeSpecs.description"
                    label="Description"
                    value={formData.officeSpecs?.description}
                    onChange={handleChange}
                />

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

                <AddressSearch
                    addressDetails={formData.addressDetails || {}}
                    setAddressDetails={(updatedAddress) =>
                        setFormData((prev) => ({ ...prev, addressDetails: updatedAddress }))
                    }
                />

                <div className="grid grid-cols-2 gap-6">
                    <TextInput
                        type="buildingName"
                        id="building-name"
                        name="contactDetails.buildingName"
                        label="Building Name"
                        value={formData.addressDetails?.buildingName}
                        onChange={handleChange}
                        placeholder="Please enter a building name"
                        error={errors.buildingName}
                    />

                    <TextInput
                        type="floorNumber"
                        id="floor-number"
                        name="contactDetails.floorNumber"
                        label="Floor Number"
                        value={formData.addressDetails?.floorNumber}
                        onChange={handleChange}
                        placeholder="Please enter the floor number"
                        error={errors.floorNumber}
                    />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <NumberInput
                        id="officeSpecs.numberOfFloors"
                        name="officeSpecs.numberOfFloors"
                        label="Number of Floors"
                        value={formData.officeSpecs?.numberOfFloors}
                        onChange={handleNumberChange}
                        min={1}
                        error={errors.floors}
                    />

                    <NumberInput
                        id="officeSpecs.totalDesks"
                        name="officeSpecs.totalDesks"
                        label="Total Desks"
                        value={formData.officeSpecs?.totalDesks}
                        onChange={handleNumberChange}
                        min={1}
                        error={errors.totalDesks}
                    />

                    <NumberInput
                        id="officeSpecs.capacity"
                        name="officeSpecs.capacity"
                        label="Capacity"
                        value={formData.officeSpecs?.capacity}
                        onChange={handleNumberChange}
                        min={1}
                        error={errors.capacity}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <TextInput
                        type="primaryContactFirstName"
                        id="primary-contact-first-name"
                        name="contactDetails.primaryContactFirstName"
                        label="Primary Contact First Name"
                        value={formData.contactDetails?.primaryContactFirstName}
                        onChange={handleChange}
                        placeholder="Enter the primary contact first name for this office"
                        error={errors.primaryContactFirstName}
                    />

                    <TextInput
                        type="primaryContactLastName"
                        id="primary-contact-last-name"
                        name="contactDetails.primaryContactLastName"
                        label="Primary Contact Last Name"
                        value={formData.contactDetails?.primaryContactLastName}
                        onChange={handleChange}
                        placeholder="Enter the primary contact last name for this office"
                        error={errors.primaryContactLastName}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <TextInput
                        type="email"
                        id="contact-details-contact-email"
                        name="contactDetails.contactEmail"
                        label="Email"
                        value={formData.contactDetails?.contactEmail}
                        onChange={handleChange}
                        placeholder="Enter a contact email for the office"
                        error={errors.contactEmail}
                    />

                    <TextInput
                        type="tel"
                        id="contact-details-contact-number"
                        name="contactDetails.contactNumber"
                        label="Contact Number"
                        value={formData.contactDetails?.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter a contact number for the office"
                        error={errors.contactNumber}
                    />
                </div>

                <OpeningHours
                    days={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                    selectedDays={formData.officeSpecs?.availability?.days || []}
                    startTime={formData.officeSpecs?.availability?.startTime || ""}
                    endTime={formData.officeSpecs?.availability?.endTime || ""}
                    onDayChange={handleAvailabilityCheckboxChange}
                    onTimeChange={handleChange}
                    errors={{
                        startTime: errors.startTime,
                        endTime: errors.endTime,
                    }}
                />

                <AmenitiesCheckbox
                    amenities={["Wi-Fi", "Power Outlets", "Monitor", "Coffee", "Air Conditioning"]} // Available amenities
                    selectedAmenities={formData.officeSpecs?.amenities || []} // Selected amenities from formData
                    onChange={handleAmenitiesChange} // Pass the change handler
                />

                <TextArea
                    id="rules"
                    name="officeSpecs.rules"
                    label="Office Rules"
                    value={formData.officeSpecs?.rules}
                    onChange={handleChange}
                    placeholder="Enter some rules for the office"
                />

                <AddOfficeButton
                    label="Add Office"
                    type="submit"
                    className="w-full" // Additional styles if needed
                />

            </form >
        </div >
    );
};

export default AddOfficePage;
