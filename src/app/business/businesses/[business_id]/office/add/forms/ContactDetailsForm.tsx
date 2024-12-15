import React from "react";
import TextInput from "../components/TextInput";

const ContactDetailsForm = ({ formData, onChange, errors }) => (
  <div className="space-y-4">
    <TextInput
      type="text"
      id="contactFirstName"
      name="contactDetails.primaryContactFirstName"
      label="Primary Contact First Name"
      value={formData.contactDetails?.primaryContactFirstName || ""}
      onChange={onChange}
      error={errors.primaryContactFirstName}
    />

    <TextInput
      type="text"
      id="contactLastName"
      name="contactDetails.primaryContactLastName"
      label="Primary Contact Last Name"
      value={formData.contactDetails?.primaryContactLastName || ""}
      onChange={onChange}
      error={errors.primaryContactLastName}
    />

    <TextInput
      type="email"
      id="contactEmail"
      name="contactDetails.contactEmail"
      label="Contact Email"
      value={formData.contactDetails?.contactEmail || ""}
      onChange={onChange}
      error={errors.contactEmail}
    />

    <TextInput
      type="tel"
      id="contactNumber"
      name="contactDetails.contactNumber"
      label="Contact Number"
      value={formData.contactDetails?.contactNumber || ""}
      onChange={onChange}
      error={errors.contactNumber}
    />
  </div>
);

export default ContactDetailsForm;
