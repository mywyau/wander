"use client";

import BusinessSpecificationsController from "@/controllers/business/BusinessSpecificationsController";
import BusinessSpecificationsForm from "@/forms/business/BusinessSpecificationsForm";
import { BusinessSpecifications } from "@/types/business/BusinessSpecifications";
import { useState } from "react";

const AddBusinessSpecificationsPage = () => {

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: BusinessSpecifications) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await BusinessSpecificationsController.submitForm(data);

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

export default AddBusinessSpecificationsPage;
