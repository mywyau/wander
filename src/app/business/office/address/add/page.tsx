"use client";

import AddOfficeButton from "@/components/office/AddOfficeButton";
import AddressDetailsForm from "@/forms/office/AddressDetailsForm";
import { officeAddressDetailsFormSchema } from "@/forms/office/OfficeAddressFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";


const AddOfficePage = () => {

  const defaultValues = {
    buildingName: "",
    street: "",
    city: "",
    country: "",
    county: "",
    postcode: ""
  };

  type OfficeAddressDetails = z.infer<typeof officeAddressDetailsFormSchema>;

  // React Hook Form Methods
  const methods =
    useForm<OfficeAddressDetails>({
      resolver: zodResolver(officeAddressDetailsFormSchema),
      defaultValues,
      mode: "onSubmit" // Validation triggers on submit
    });

  const onSubmit = (data: OfficeAddressDetails) => {
    console.log("Combined Data:", data);

    fetch("/api/offices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-xl font-bold">Add Address Details to Office</h1>

        <AddressDetailsForm />

        {/* Use AddOfficeButton as Submit Button */}
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
