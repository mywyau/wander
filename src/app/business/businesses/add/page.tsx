"use client";

import React, { useState } from "react";
import AddBusinessButton from "./components/AddBusinessButton";
import AddressSearch from "./components/AddressSearch";
import TextArea from "./components/TextArea";
import TextInput from "./components/TextInput";
import { createBusiness } from "./service/AddBusinessConnector";
import { initializeBusinessForm } from "./service/FormFactory";
import { handleNestedChange, validateBusinessForm } from "./service/FormUtils";
import { BusinessListing } from "./types/BusinessListing";

const AddBusinessPage = () => {
    const [formData, setFormData] = useState<Partial<BusinessListing>>(initializeBusinessForm());
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => handleNestedChange(prev, name, value));
    };

    const handleAddressSelect = (data: {
        address: string;
        location: { lat: number; lng: number };
        components: { street: string; city: string; postcode: string };
    }) => {
        setFormData((prev) => ({
            ...prev,
            addressDetails: {
                ...prev.addressDetails!,
                street: data.components.street,
                city: data.components.city,
                postcode: data.components.postcode,
                latitude: data.location.lat,
                longitude: data.location.lng,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        const validationErrors = validateBusinessForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const result = await createBusiness(formData);
                console.log("Business created:", result);
                setFormData(initializeBusinessForm());
                setErrors({});
            } catch (error) {
                console.error("Error creating business:", error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Add a Business</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <TextInput
                    type="text"
                    id="businessSpecs.businessName"
                    name="businessSpecs.businessName"
                    label="Business Name"
                    value={formData.businessSpecs?.businessName || ""}
                    onChange={handleChange}
                    placeholder="Enter the Business name"
                    error={errors.businessName}
                />

                <TextArea
                    id="description"
                    name="businessSpecs.description"
                    label="Description"
                    value={formData.businessSpecs?.description || ""}
                    onChange={handleChange}
                />

                <AddressSearch
                    addressDetails={formData.addressDetails || {}}
                    setAddressDetails={(updatedAddress) =>
                        setFormData((prev) => ({ ...prev, addressDetails: updatedAddress }))
                    }
                />

                <div className="grid grid-cols-2 gap-6">
                    <TextInput
                        type="businessName"
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

                <div className="grid grid-cols-2 gap-6">
                    <TextInput
                        type="text"
                        id="primary-contact-first-name"
                        name="contactDetails.primaryContactFirstName"
                        label="Primary Contact First Name"
                        value={formData.contactDetails?.primaryContactFirstName}
                        onChange={handleChange}
                        placeholder="Enter a contact's first name"
                        error={errors.primaryContactFirstName}
                    />

                    <TextInput
                        type="text"
                        id="primary-contact-last-name"
                        name="contactDetails.primaryContactLastName"
                        label="Primary Contact Last Name"
                        value={formData.contactDetails?.primaryContactLastName}
                        onChange={handleChange}
                        placeholder="Enter a contact's last name"
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
                        placeholder="Enter an email for business enqueries"
                        error={errors.contactEmail}
                    />

                    <TextInput
                        type="tel"
                        id="contact-details-contact-number"
                        name="contactDetails.contactNumber"
                        label="Contact Number"
                        value={formData.contactDetails?.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter a phone number for business enqueries"
                        error={errors.contactNumber}
                    />
                </div>

                <AddBusinessButton label="Add Business" type="submit" className="w-full" />
            </form>
        </div>
    );
};

export default AddBusinessPage;
