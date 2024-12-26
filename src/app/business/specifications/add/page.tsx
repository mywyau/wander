"use client";

import OpeningHours from "@/components/business/OpeningHours";
import TextArea from "@/components/business/TextArea";
import TextInput from "@/components/business/TextInput";
import AppConfig from "@/config/AppConfig";
import { businessSpecificationsSchema } from "@/forms/business/BusinessSpecificationsFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


//  note to self sort out database time issues, scala backend data model using LocalTime and look into 
//  npm install dayjs for frontend time handling

const AddBusinessSpecificationsPage = () => {

  type BusinessSpecifications = z.infer<typeof businessSpecificationsSchema>;

  const defaultValues = {
    businessName: "",
    description: "",
    availability: {
      days: [],
      startTime: "09:00",
      endTime: "17:00",
    },
  };

  // React Hook Form Methods
  const methods = useForm<BusinessSpecifications>({
    resolver: zodResolver(businessSpecificationsSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: BusinessSpecifications) => {

    const pistachioUrl = AppConfig.basePistachioUrl(false);

    console.log("onSubmit called");
    console.log("Form Data:", data);
    console.log(`http://${pistachioUrl}/pistachio/business/businesss/specifications/create`)

    setSubmitError(null); // Reset error before submitting
    setSuccessMessage(null); // Reset success message before submitting

    const combinedData = {
      ...data,
      userId: "USER123456",
      businessId: "BUS123456"

    };


    console.log(combinedData);

    try {
      const response = await fetch(
        `http://${pistachioUrl}/pistachio/business/businesss/specifications/create`,
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

  const amenitiesList = ["Air Conditioning", "Coffee", "Food", "Printer", "Parking", "Quiet Zones", "WiFi"];

  return (
    <div className="max-w-7xl mx-auto p-8" >
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-xl font-bold">Add Business Specifications</h1>

        {submitError && <p className="text-red-500">{submitError}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6">

            <TextInput
              id="businessName"
              name="businessName"
              label="Business Name"
              placeholder="Enter a name for the business"
              register={register}
              error={errors?.businessName?.message}
              inputClassName="w-1/2"
            />

            <TextArea
              id="description"
              name="description"
              label="Business Description"
              register={register}
              placeholder="Short description of the office"
              error={errors.description?.message}
              inputClassName="w-2/3"
            />

            <OpeningHours
              days={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
              namePrefix="availability"
              register={register}
              errors={errors.availability}
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

export default AddBusinessSpecificationsPage;
