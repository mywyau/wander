"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { addressDetailsSchema, contactDetailsSchema, officeSpecsSchema } from "./helpers/validationHelpers";
import OfficeSpecsForm from "./forms/OfficeSpecsForm";

// Combined schema for backend
const combinedSchema = z.object({
    officeSpecs: officeSpecsSchema,
    addressDetails: addressDetailsSchema,
    contactDetails: contactDetailsSchema,
});

// Infer type from schema
type CombinedFormData = z.infer<typeof combinedSchema>;

const AddOfficePage = () => {

    const defaultOfficeSpecs: {
        officeName: string;
        description: string;
        officeType: string;
        numberOfFloors: number;
        capacity: number;
        totalDesks: number;
        amenities: [string, ...string[]]; // Explicitly typed as non-empty array
        availability: {
            days: [string, ...string[]]; // Explicitly typed as non-empty array
            startTime: string;
            endTime: string;
        };
        rules: string;
    } = {
        officeName: "",
        description: "",
        officeType: "",
        numberOfFloors: 1,
        capacity: 1,
        totalDesks: 1,
        amenities: ["Wi-Fi"], // At least one amenity
        availability: {
            days: ["Monday"], // At least one day
            startTime: "09:00",
            endTime: "17:00",
        },
        rules: "",
    };


    const officeSpecsForm = useForm({
        resolver: zodResolver(officeSpecsSchema), // Attach the schema
        defaultValues: defaultOfficeSpecs, // Use the default structure
    });

    const defaultAddressDetails = {
        buildingName: "",
        floorNumber: "",
        street: "",
        city: "",
        country: "",
        county: "",
        postcode: "",
    };

    const addressDetailsForm = useForm({
        resolver: zodResolver(addressDetailsSchema), // Attach the schema
        defaultValues: defaultAddressDetails, // Use the default structure
    });

    const defaultContactDetails = {
        primaryContactFirstName: "",
        primaryContactLastName: "",
        contactEmail: "",
        contactNumber: "",
    };

    const contactDetailsForm = useForm({
        resolver: zodResolver(contactDetailsSchema), // Attach the schema
        defaultValues: defaultContactDetails, // Use the default structure
    });

    const handleSubmit = () => {

        const officeSpecsData = officeSpecsForm.getValues();
        const addressDetailsData = addressDetailsForm.getValues();
        const contactDetailsData = contactDetailsForm.getValues();

        // Combine all data into a single object
        const combinedData: CombinedFormData = {
            officeSpecs: officeSpecsData,
            addressDetails: addressDetailsData,
            contactDetails: contactDetailsData,
        };

        console.log("Combined Data:", combinedData);

        // Send combinedData to your backend
        fetch("/api/offices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(combinedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to submit form");
                }
                return response.json();
            })
            .then((data) => console.log("Successfully submitted:", data))
            .catch((error) => console.error("Submission error:", error));
    };

    return (
        <div className="space-y-6">
        
            <FormProvider {...officeSpecsForm}>
                <form onSubmit={officeSpecsForm.handleSubmit(handleSubmit)}>
                    <h2>Office Specs</h2>
                    <OfficeSpecsForm />
                </form>
            </FormProvider>

        
            {/* <FormProvider {...addressDetailsForm}>
                <form onSubmit={addressDetailsForm.handleSubmit(handleSubmit)}>
                    <h2>Address Details</h2>
                    <AddressDetailsForm />
                </form>
            </FormProvider>

        
            <FormProvider {...contactDetailsForm}>
                <form onSubmit={contactDetailsForm.handleSubmit(handleSubmit)}>
                    <h2>Contact Details</h2>
                    <ContactDetailsForm />
                </form>
            </FormProvider> */}

            <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary">
                Submit All
            </button>
        </div>
    );
};

export default AddOfficePage;
