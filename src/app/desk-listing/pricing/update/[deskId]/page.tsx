"use client";

import DeskPricingController from "@/controllers/desk/DeskPricingController";
import DeskPricingForm from "@/forms/desks/DeskPricingForm";
import { UpdateDeskPricing } from "@/types/desk/UpdateDeskPricing";
import { useState } from "react";


interface EditDeskPricingPageProps {
  params: {
    deskId: string
  };
}

export default function EditDeskPricingPage({ params }: EditDeskPricingPageProps) {

  const { deskId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: UpdateDeskPricing) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await DeskPricingController.submitForm(data, deskId);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <DeskPricingForm
        onSubmit={onSubmit}
        submitError={submitError}
        successMessage={successMessage}
      />
    </div>
  );
};
