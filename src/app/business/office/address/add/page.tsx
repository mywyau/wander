
// Refactored AddOfficePage
"use client";

import { useState } from "react";
import OfficeAddressDetailsController from "@/controllers/office/OfficeAddressDetailsController";
import { CreateOfficeAddressDetails } from "@/types/office/CreateOfficeAddressDetails";
import OfficeAddressDetailsForm from "@/forms/office/OfficeAddressDetailsForm";

const AddOfficePage = () => {
  
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateOfficeAddressDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await OfficeAddressDetailsController.submitForm(data);

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

export default AddOfficePage;