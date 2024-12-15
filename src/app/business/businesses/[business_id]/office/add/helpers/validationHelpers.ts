import { Office } from "../types/OfficeInterfaces";

export const validateForm = (formData: Partial<Office>) => {
  const errors: { [key: string]: string } = {};

  // Validate Office Specs
  const requiredOfficeSpecsFields = [
    "officeName",
    "description",
    "officeType",
    "numberOfFloors",
    "capacity",
    "amenities",
    "availability",
    "rules",
  ];
  requiredOfficeSpecsFields.forEach((field) => {
    if (!formData.officeSpecs?.[field as keyof typeof formData.officeSpecs]) {
      errors[field] = `${field} is required.`;
    }
  });

  // Validate Address Details
  const requiredAddressFields = [
    "buildingName",
    "floorNumber",
    "street",
    "city",
    "country",
    "county",
    "postcode",
  ];
  requiredAddressFields.forEach((field) => {
    if (!formData.addressDetails?.[field as keyof typeof formData.addressDetails]) {
      errors[field] = `${field} is required.`;
    }
  });

  // Validate Contact Details
  const requiredContactFields = [
    "primaryContactFirstName",
    "primaryContactLastName",
    "contactEmail",
    "contactNumber",
  ];
  requiredContactFields.forEach((field) => {
    if (!formData.contactDetails?.[field as keyof typeof formData.contactDetails]) {
      errors[field] = `${field} is required.`;
    }
  });

  return errors;
};
