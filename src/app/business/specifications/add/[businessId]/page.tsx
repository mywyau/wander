"use client";

";
import BusinessSpecificationsConnector from "@/connectors/BusinessSpecificationsConnector";
import BusinessSpecificationsForm from "@/forms/business/BusinessSpecificationsForm";
import { UpdateBusinessSpecifications } from "@/types/business/UpdateBusinessSpecifications";
import { useState } from "react";

interface EditBusinessSpecificationsPageProps {
  params: {
    businessId: string
  };
}

export default function EditBusinessSpecificationsPage({ params }: EditBusinessSpecificationsPageProps) {

  const { businessId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: UpdateBusinessSpecifications) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await BusinessSpecificationsConnector.submitForm(data, businessId);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8" >
      <BusinessSpecificationsForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};
