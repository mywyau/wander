"use client";

import AppConfig from "@/config/AppConfig";
import { officeAddressDetailsFormSchema } from "@/forms/office/OfficeAddressFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const AddOfficePage = () => {

  const appConfig = new AppConfig;

  type OfficeAddressDetails = z.infer<typeof officeAddressDetailsFormSchema>;

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

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: OfficeAddressDetails) => {

    const pistachioUrl = AppConfig.basePistachioUrl(false);

    console.log("onSubmit called");
    console.log("Form Data:", data);
    console.log(`http://${pistachioUrl}/pistachio/business/offices/address/create`)

    setSubmitError(null); // Reset error before submitting
    setSuccessMessage(null); // Reset success message before submitting

    const combinedData = {
      ...data,
      businessId: "BUS123456",
      floorNumber: "1",
      officeId: "OFF123456",
      latitude: 999,
      longitude: 999,
    };


    console.log(combinedData);


    try {
      const response = await fetch(
        `http://${pistachioUrl}/pistachio/business/offices/address/create`,
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
        <h1 className="text-xl font-bold">Add Address Details to Office</h1>

        {submitError && <p className="text-red-500">{submitError}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-4">
              <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700">
                Building Name (optional)
              </label>
              <input
                id="buildingName"
                name="buildingName"
                placeholder="Enter the name of the building (if applicable)"
                {...register("buildingName")}
                className={`mt-1 px-4 py-2 border rounded-md ${errors?.buildingName ? "border-red-500" : "border-gray-300"} w-1/2`}
                aria-invalid={!!errors?.buildingName}
                aria-describedby={errors?.buildingName ? "buildingName-error" : undefined}
              />
              {errors?.buildingName && (
                <p id="buildingName-error" className="text-red-500 text-sm mt-1">
                  {errors.buildingName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                id="street"
                name="street"
                placeholder="Enter the name of the street"
                {...register("street")}
                className={`mt-1 px-4 py-2 border rounded-md ${errors?.street ? "border-red-500" : "border-gray-300"} w-1/2`}
                aria-invalid={!!errors?.street}
                aria-describedby={errors?.street ? "street-error" : undefined}
              />
              {errors?.street && (
                <p id="street-error" className="text-red-500 text-sm mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="city"
                name="city"
                placeholder="Enter the name of the city"
                {...register("city")}
                className={`mt-1 px-4 py-2 border rounded-md ${errors?.city ? "border-red-500" : "border-gray-300"} w-1/2`}
                aria-invalid={!!errors?.city}
                aria-describedby={errors?.city ? "city-error" : undefined}
              />
              {errors?.city && (
                <p id="city-error" className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                id="country"
                name="country"
                placeholder="Enter name of the country"
                {...register("country")}
                className={`mt-1 px-4 py-2 border rounded-md ${errors?.country ? "border-red-500" : "border-gray-300"} w-1/2`}
                aria-invalid={!!errors?.country}
                aria-describedby={errors?.country ? "country-error" : undefined}
              />
              {errors?.country && (
                <p id="country-error" className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="county" className="block text-sm font-medium text-gray-700">
                County
              </label>
              <input
                id="county"
                name="county"
                placeholder="Enter the name of the county"
                {...register("county")}
                className={`mt-1 px-4 py-2 border rounded-md ${errors?.county ? "border-red-500" : "border-gray-300"} w-1/2`}
                aria-invalid={!!errors?.county}
                aria-describedby={errors?.county ? "county-error" : undefined}
              />
              {errors?.county && (
                <p id="county-error" className="text-red-500 text-sm mt-1">
                  {errors.county.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                Postcode
              </label>
              <input
                id="postcode"
                name="postcode"
                placeholder="Enter the postcode"
                {...register("postcode")}
                className={`mt-1 px-4 py-2 border rounded-md ${errors?.postcode ? "border-red-500" : "border-gray-300"} w-1/2`}
                aria-invalid={!!errors?.postcode}
                aria-describedby={errors?.postcode ? "postcode-error" : undefined}
              />
              {errors?.postcode && (
                <p id="postcode-error" className="text-red-500 text-sm mt-1">
                  {errors.postcode.message}
                </p>
              )}
            </div>
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
