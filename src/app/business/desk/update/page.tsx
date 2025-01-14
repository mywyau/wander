"use client";

import DeskListingController from "@/controllers/desk/DeskListingController";
import DeskListingForm from "@/forms/desk/DeskListingForm";
import { CreateDeskListing } from "@/types/desk/CreateDeskListing";
import { useState } from "react";

interface EditDeskListingPageProps {
  params: {
    deskId: string
  };
}

export default function EditDeskListingPage({ params }: EditDeskListingPageProps) {

  const { deskId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateDeskListing) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await DeskListingController.submitForm(data, deskId);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8" >
      <DeskListingForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};
