
// Refactored AddOfficePage
"use client";

import OfficeAddressDetailsController from "@/connectors/office/OfficeAddressDetailsConnector";
import OfficeAddressDetailsForm from "@/forms/office/OfficeAddressDetailsForm";
import { CreateOfficeAddressDetails } from "@/types/office/CreateOfficeAddressDetails";
import { useState } from "react";


interface AddOfficePageProps {
  params: {
    officeId: string
  };
}

export default function EditOfficeAddressPage({ params }: AddOfficePageProps) {

  const { officeId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateOfficeAddressDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await OfficeAddressDetailsController.submitForm(data, officeId);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <OfficeAddressDetailsForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};
