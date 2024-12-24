"use client";

import Amenities from "@/components/office/Amenities";
import NumberInput from "@/components/office/NumberInput";
import OpeningHours from "@/components/office/OpeningHours";
import TextArea from "@/components/office/TextArea";
import TextInput from "@/components/office/TextInput";
import AppConfig from "@/config/AppConfig";
import { officeSpecificationsSchema } from "@/forms/office/OfficeSpecificationsFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddOfficePage = () => {

  type OfficeSpecificationsDetails = z.infer<typeof officeSpecificationsSchema>;

  const defaultValues = {
    officeName: "",
    description: "",
    officeType: "",
    numberOfFloors: 0,
    capacity: 0,
    totalDesks: 0,
    amenities: [],
    availability: {
      days: [],
      startTime: "09:00",
      endTime: "17:00",
    },
    rules: "",
  };

  // React Hook Form Methods
  const methods = useForm<OfficeSpecificationsDetails>({
    resolver: zodResolver(officeSpecificationsSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: OfficeSpecificationsDetails) => {

    const pistachioUrl = AppConfig.basePistachioUrl(false);

    console.log("onSubmit called");
    console.log("Form Data:", data);
    console.log(`http://${pistachioUrl}/pistachio/business/offices/specifications/create`)

    setSubmitError(null); // Reset error before submitting
    setSuccessMessage(null); // Reset success message before submitting

    const combinedData = {
      ...data,
      businessId: "BUS123456",
      officeId: "OFF123456",
    };


    console.log(combinedData);

    try {
      const response = await fetch(
        `http://${pistachioUrl}/pistachio/business/offices/specifications/create`,
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
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-xl font-bold">Add Contact Details to Office</h1>

        {submitError && <p className="text-red-500">{submitError}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6">

            <TextInput
              id="officeName"
              name="officeName"
              label="Office Name"
              placeholder="Enter a name for the office"
              register={register}
              error={errors?.officeName?.message}
              inputClassName="w-1/2"
            />

            <TextArea
              id="description"
              name="description"
              label="Office Description"
              register={register}
              placeholder="Short description of the office"
              error={errors.description?.message}
            />

            <TextArea
              id="rules"
              name="rules"
              label="Office Rules"
              register={register}
              placeholder="Enter any rules you want for the office"
              error={errors.rules?.message}
            />

            <div className="w-1/2">
              <div className="grid grid-cols-3 gap-4">

                <NumberInput
                  id="numberOfFloors"
                  name="numberOfFloors"
                  label="Number Of Floors"
                  register={register}
                  placeholder="Enter the number of floors"
                  error={errors.numberOfFloors?.message}
                  inputClassName="w-full"
                />

                <NumberInput
                  id="capacity"
                  name="capacity"
                  label="Capacity"
                  register={register}
                  placeholder="Enter the capacity of the office"
                  error={errors.capacity?.message}
                  inputClassName="w-full"
                />

                <NumberInput
                  id="totalDesks"
                  name="totalDesks"
                  label="Total Number of Desks"
                  register={register}
                  placeholder="Enter the total number of desks in the office"
                  error={errors.totalDesks?.message}
                  inputClassName="w-full"
                />
              </div>
            </div>

            <Amenities
              amenities={amenitiesList}
              name="amenities"
              register={register}
              error={errors.amenities?.message}
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

export default AddOfficePage;
