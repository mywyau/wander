"use client";

import BusinessContactDetailsConnector from "@/connectors/BusinessContactDetailsConnector";
import BusinessContactDetailsForm from "@/forms/business/BusinessContactDetailsForm";
import { BusinessContactDetails } from "@/types/business/BusinessListing";
import { useState } from "react";


interface EditBusinessContactDetailsPageProps {
  params: {
    businessId: string
  };
}

export default function EditBusinessContactDetailsPage({ params }: EditBusinessContactDetailsPageProps) {

  const { businessId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: BusinessContactDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await BusinessContactDetailsConnector.submitForm(data, businessId);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <BusinessContactDetailsForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};
