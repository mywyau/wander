"use client";

import BusinessAddressDetailsController from "@/controllers/business/BusinessAddressDetailsController";
import BusinessAddressDetailsForm from "@/forms/business/BusinessAddressDetailsForm";
import { CreateBusinessAddressDetails } from "@/types/business/CreateBusinessAddressDetails";
import { useState } from "react";

interface EditBusinessPageProps {
  params: {
    businessId: string
  };
}

export default function EditBusinessAddressPage({ params }: EditBusinessPageProps) {

  const { businessId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateBusinessAddressDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await BusinessAddressDetailsController.submitForm(data, businessId);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-8" >
      <BusinessAddressDetailsForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};
