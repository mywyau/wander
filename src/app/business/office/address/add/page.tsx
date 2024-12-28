
// Refactored AddOfficePage
"use client";

import { useState } from "react";
import OfficeAddressController from "@/controllers/office/OfficeAddressController";
import { OfficeAddressDetails } from "@/types/office/OfficeAddressDetails";
import OfficeAddressDetailsForm from "@/forms/office/OfficeAddressDetailsForm";

const AddOfficePage = () => {
  
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: OfficeAddressDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await OfficeAddressController.submitForm(data);

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