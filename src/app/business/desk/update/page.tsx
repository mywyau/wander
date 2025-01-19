"use client";

import DeskSpecificationsController from "@/controllers/desk/DeskSpecificationsController";
import DeskSpecificationsForm from "@/forms/desks/DeskSpecifcationsForm";
import { UpdateDeskSpecifications } from "@/types/desk/UpdateDeskSpecifications";
import { useState } from "react";

interface EditDeskSpecificationsPageProps {
  params: {
    deskId: string
  };
}

export default function EditDeskSpecificationsPage({ params }: EditDeskSpecificationsPageProps) {

  const { deskId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: UpdateDeskSpecifications) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await DeskSpecificationsController.submitForm(data, deskId);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8" >
      <DeskSpecificationsForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};
