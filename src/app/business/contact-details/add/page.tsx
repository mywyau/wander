"use client";

import BusinessContactDetailsController from "@/controllers/business/BusinessContactDetailsController";
import BusinessContactDetailsForm from "@/forms/business/BusinessContactDetailsForm";
import { BusinessContactDetails } from "@/types/business/BusinessContactDetails";
import { useState } from "react";

const AddBusinessContactDetailsPage = () => {

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: BusinessContactDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await BusinessContactDetailsController.submitForm(data);

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

export default AddBusinessContactDetailsPage;
