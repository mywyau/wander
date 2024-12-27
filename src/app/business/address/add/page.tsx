"use client";

import TextInput from "@/components/business/TextInput";
import AppConfig from "@/config/AppConfig";
import { businessAddressDetailsFormSchema } from "@/forms/business/BusinessAddressFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddBusinessAddressPage = () => {

  type BusinessAddressDetails = z.infer<typeof businessAddressDetailsFormSchema>;

  const defaultValues = {
    businessName: "",
    buildingName: "",
    street: "",
    city: "",
    country: "",
    county: "",
    postcode: "",
  };

  // React Hook Form Methods
  const methods = useForm<BusinessAddressDetails>({
    resolver: zodResolver(businessAddressDetailsFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: BusinessAddressDetails) => {

    const pistachioUrl = AppConfig.basePistachioUrl(false);

    console.log("onSubmit called");
    console.log("Form Data:", data);
    console.log(`http://${pistachioUrl}/pistachio/business/businesses/address/details/create`)

    setSubmitError(null); // Reset error before submitting
    setSuccessMessage(null); // Reset success message before submitting

    const combinedData = {
      ...data,
      userId: "USER123456",
      businessId: "BUS123456",
      floorNumber: "1",
      latitude: 999,
      longitude: 999,
    };


    console.log(combinedData);


    try {
      const response = await fetch(
        `http://${pistachioUrl}/pistachio/business/businesses/address/details/create`,
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
      setSubmitError("Failed to submit. Please try again.");
    }
  };

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="max-w-7xl mx-auto p-8" >
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-xl font-bold">Add Business Address Details</h1>

        {submitError && <p className="text-red-500">{submitError}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6">

            <TextInput
              id="buildingName"
              name="buildingName"
              label="Building Name (optional)"
              placeholder="Enter the name of the building (if applicable)"
              register={register}
              error={errors?.buildingName?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="businessName"
              name="businessName"
              label="Business Name"
              placeholder="Enter the name of the business"
              register={register}
              error={errors?.businessName?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="street"
              name="street"
              label="Street"
              placeholder="Enter the name of the street"
              register={register}
              error={errors?.street?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="city"
              name="city"
              label="City"
              placeholder="Enter the name of the city"
              register={register}
              error={errors?.city?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="country"
              name="country"
              label="Country"
              placeholder="Enter the a country"
              register={register}
              error={errors?.country?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="county"
              name="county"
              label="County"
              placeholder="Enter the a county"
              register={register}
              error={errors?.county?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="postcode"
              name="postcode"
              label="Postcode"
              placeholder="Enter the the postcode"
              register={register}
              error={errors?.postcode?.message}
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

export default AddBusinessAddressPage;
