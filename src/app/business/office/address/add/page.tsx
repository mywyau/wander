"use client";

import AppConfig from "@/config/AppConfig";
import AddOfficeButton from "@/components/office/AddOfficeButton";
import AddressDetailsForm from "@/forms/office/AddressDetailsForm";
import { officeAddressDetailsFormSchema } from "@/forms/office/OfficeAddressFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { OfficeAddressDetails } from "@/types/office/OfficeAddressDetails";

const AddOfficePage = () => {
  const defaultValues = {
    buildingName: "",
    street: "",
    city: "",
    country: "",
    county: "",
    postcode: "",
  };

  // React Hook Form Methods
  const methods = useForm<OfficeAddressDetails>({
    resolver: zodResolver(officeAddressDetailsFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = (data: OfficeAddressDetails) => {
    console.log("Form Data:", data);

  
    const extraFields = {
      officeId: "OFF12345", 
      businessId: "BUS12345",
    };

  
    const combinedData = {
      ...data,
      ...extraFields,
    };

    console.log("Combined Data with Extra Fields:", combinedData);

    // Send the combined data to the backend
    fetch(
      `http://${AppConfig.basePistachioUrl(true)}/pistachio/business/office/address/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then((responseData) => console.log("Successfully submitted:", responseData))
      .catch((error) => console.error("Submission error:", error));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-xl font-bold">Add Address Details to Office</h1>

        <AddressDetailsForm />

        <AddOfficeButton
          label="Submit"
          type="submit"
          className="btn-primary w-1/3"
        />
      </form>
    </FormProvider>
  );
};

export default AddOfficePage;
