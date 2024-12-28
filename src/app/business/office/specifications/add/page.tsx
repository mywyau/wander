"use client";

import OfficeSpecificationsController from "@/controllers/office/OfficeSpecificationsController";
import OfficeSpecificationsForm from "@/forms/office/OfficeSpecificationsForm";
import { OfficeSpecifications } from "@/types/office/OfficeSpecifications";
import { useState } from "react";


const AddOfficeSpecificationsPage = () => {


  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: OfficeSpecifications) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await OfficeSpecificationsController.submitForm(data);

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

export default AddOfficeSpecificationsPage;
