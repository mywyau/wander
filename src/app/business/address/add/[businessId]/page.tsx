// "use client";

import BusinessAddressDetailsConnector from "@/connectors/BusinessAddressDetailsConnector";
import BusinessAddressDetailsForm from "@/forms/business/BusinessAddressDetailsForm";
import { UpdateBusinessAddressDetails } from "@/types/business/UpdateBusinessAddressDetails";
import { useState } from "react";

interface EditBusinessPageProps {
  params: {
    businessId: string
  };
}

export default function EditBusinessAddressPage({ params }: EditBusinessPageProps) {

  const { businessId } = params;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: UpdateBusinessAddressDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const result = await BusinessAddressDetailsConnector.submitForm(data, businessId);

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
