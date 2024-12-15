"use client";

import React, { useState } from "react";
import AddOfficeButton from "./components/AddOfficeButton";
import AddressDetailsForm from "./forms/AddressDetailsForm";
import ContactDetailsForm from "./forms/ContactDetailsForm";
import OfficeSpecsForm from "./forms/OfficeSpecsForm";
import { updateNestedField } from "./helpers/formHelpers";
import { validateForm } from "./helpers/validationHelpers";
import { Office } from "./types/OfficeInterfaces";

const AddOfficePage = () => {
  const [formData, setFormData] = useState<Partial<Office>>({
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
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      name.includes(".")
        ? updateNestedField(prev, name.split("."), value)
        : { ...prev, [name]: value }
    );
  };

    //   const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     const parsedValue = parseFloat(value) || 0;
    //     setFormData((prev) =>
    //       name.includes(".")
    //         ? updateNestedField(prev, name.split("."), parsedValue)
    //         : { ...prev, [name]: parsedValue }
    //     );
    //   };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Parse the string value to a number, or set it as undefined if empty
    const parsedValue = value === "" ? undefined : parseFloat(value);
  
    setFormData((prev) =>
      name.includes(".")
        ? updateNestedField(prev, name.split("."), parsedValue)
        : { ...prev, [name]: parsedValue }
    );
  };
  

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedAmenities = prev.officeSpecs?.amenities || [];
      return {
        ...prev,
        officeSpecs: {
          ...prev.officeSpecs,
          amenities: checked
            ? [...updatedAmenities, value]
            : updatedAmenities.filter((amenity) => amenity !== value),
        },
      };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form data ready for submission:", formData);
      // Submit logic here...
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add an Office</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Office Specs Form */}
        <OfficeSpecsForm
          formData={formData}
          onChange={handleChange}
          onNumberChange={handleNumberChange}
          onAvailabilityCheckboxChange={handleAvailabilityCheckboxChange}
          onAmenitiesCheckboxChange={handleAmenitiesChange}
          errors={errors}
        />

        {/* Address Details Form */}
        <AddressDetailsForm
          formData={formData}
          onChange={handleChange}
          errors={errors}
        />

        {/* Contact Details Form */}
        <ContactDetailsForm
          formData={formData}
          onChange={handleChange}
          errors={errors}
        />

        {/* Submit Button */}
        <AddOfficeButton
          label="Add Office"
          type="submit"
          className="w-full"
        />
      </form>
    </div>
  );
};

export default AddOfficePage;
