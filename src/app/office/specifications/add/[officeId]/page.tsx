"use client";

import OfficeSpecificationsController from "@/connectors/office/OfficeSpecificationsConnector";
import OfficeSpecificationsForm from "@/forms/office/OfficeSpecificationsForm";
import { CreateOfficeSpecifications } from "@/types/office/CreateOfficeSpecifications";
import { useState } from "react";

interface EditOfficeSpecificationsPageProps {
  params: {
    officeId: string
  };
}

export default function EditOfficeSpecificationsPage({ params }: EditOfficeSpecificationsPageProps) {

  const { officeId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateOfficeSpecifications) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await OfficeSpecificationsController.submitForm(data, officeId);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8" >
      <OfficeSpecificationsForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};
