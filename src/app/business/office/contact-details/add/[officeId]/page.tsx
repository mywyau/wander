"use client";

import OfficeContactDetailsController from "@/controllers/office/OfficeContactDetailsController";
import OfficeContactDetailsForm from "@/forms/office/OfficeContactDetailsForm";
import { CreateOfficeContactDetails } from "@/types/office/CreateOfficeContactDetails";
import { useState } from "react";

const AddOfficeContactDetailsPage = () => {

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateOfficeContactDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await OfficeContactDetailsController.submitForm(data);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <OfficeContactDetailsForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};

export default AddOfficeContactDetailsPage;
