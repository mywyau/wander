"use client";

import TextInput from "@/components/business/TextInput";
import AppConfig from "@/config/AppConfig";
import { businessContactDetailsSchema } from "@/forms/business/BusinessContactDetailsFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddBusinessContactDetailsPage = () => {

  type BusinessContactDetailsDetails = z.infer<typeof businessContactDetailsSchema>;

  const defaultValues = {
    primaryContactFirstName: "",
    primaryContactLastName: "",
    contactEmail: "",
    contactNumber: ""
  };

  // React Hook Form Methods
  const methods = useForm<BusinessContactDetailsDetails>({
    resolver: zodResolver(businessContactDetailsSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: BusinessContactDetailsDetails) => {

    const pistachioUrl = AppConfig.basePistachioUrl(false);

    console.log("onSubmit called");
    console.log("Form Data:", data);
    console.log(`http://${pistachioUrl}/pistachio/business/businesss/contact/details/create`)

    setSubmitError(null); // Reset error before submitting
    setSuccessMessage(null); // Reset success message before submitting

    const combinedData = {
      ...data,
      userId: "USER123456",
      businessId: "OFF123456",
    };

    console.log(combinedData);

    try {
      const response = await fetch(
        `http://${pistachioUrl}/pistachio/business/businesss/contact/details/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(combinedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData = await response.json();
      console.log("Successfully submitted:", responseData);
      setSuccessMessage("Form submitted successfully!");
      methods.reset(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Failed to submit the form. Please try again.");
    }
  };

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">

        <h1 className="text-xl font-bold">Add the Business Contact Details</h1>

        {submitError && <p className="text-red-500">{submitError}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6">

            <TextInput
              id="primaryContactFirstName"
              name="primaryContactFirstName"
              label="Primary Contact First Name"
              placeholder="Enter a first name"
              register={register}
              error={errors?.primaryContactFirstName?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="primaryContactLastName"
              name="primaryContactLastName"
              label="Primary Contact Last Name"
              placeholder="Enter a last name"
              register={register}
              error={errors?.primaryContactLastName?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="contactEmail"
              name="contactEmail"
              label="Email"
              placeholder="Enter an email"
              register={register}
              error={errors?.contactEmail?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="contactNumber"
              name="contactNumber"
              label="Contact Number"
              placeholder="Enter a phone number"
              register={register}
              error={errors?.contactNumber?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="websiteUrl"
              name="websiteUrl"
              label="Website URL (optional)"
              placeholder="Enter the business website address"
              register={register}
              error={errors?.websiteUrl?.message}
              inputClassName="w-1/2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-1/3 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default AddBusinessContactDetailsPage;
