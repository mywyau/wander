"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import OfficeSpecsForm from "./forms/OfficeSpecsForm";
import AddressDetailsForm from "./forms/AddressDetailsForm";
import ContactDetailsForm from "./forms/ContactDetailsForm";
import { combinedSchema } from "./helpers/combinedSchema";

type CombinedFormData = z.infer<typeof combinedSchema>;

const AddOfficePage = () => {

  const defaultValues = {
    officeSpecs: {
      officeName: "",
      description: "",
      officeType: "",
      numberOfFloors: "",
      capacity: "",
      totalDesks: "",
      amenities: [],
      availability: {
        days: [],
        startTime: "09:00",
        endTime: "17:00",
      },
      rules: "",
    }
  };

  const methods = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues,
    // mode: "onChange", // Validation triggers on each change
  });

  const onSubmit = (data: CombinedFormData) => {
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
        <h1 className="text-xl font-bold">Add Office</h1>

        <OfficeSpecsForm />

        <button type="submit" className="btn-primary">
          Submit All
        </button>
      </form>
    </FormProvider>
  );
};

export default AddOfficePage;