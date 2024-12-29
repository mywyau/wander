"use client";

import BusinessAddressDetailsController from "@/controllers/business/BusinessAddressDetailsController";
import BusinessAddressDetailsForm from "@/forms/business/BusinessAddressDetailsForm";
import { BusinessAddressDetails } from "@/types/business/BusinessAddressDetails";
import { useState } from "react";

const AddBusinessAddressPage = () => {

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: BusinessAddressDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await BusinessAddressDetailsController.submitForm(data);

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

export default AddBusinessAddressPage;
