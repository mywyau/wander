import { BusinessListing } from "../types/BusinessListing";

export const handleNestedChange = (prevState: any, name: string, value: any) => {
    const keys = name.split(".");
    if (keys.length === 1) {
      // Top-level field
      return { ...prevState, [name]: value };
    } else if (keys.length === 2) {
      // Nested field
      const [parent, child] = keys;
      return {
        ...prevState,
        [parent]: {
          ...(prevState[parent] as object),
          [child]: value,
        },
      };
    }
    return prevState;
  };

  export const validateBusinessForm = (formData: Partial<BusinessListing>) => {
    const errors: { [key: string]: string } = {};
  
    if (!formData.businessSpecs?.businessName) {
      errors.businessName = "Business name is required.";
    }
    if (!formData.addressDetails?.street) {
      errors.street = "Street address is required.";
    }
    if (!formData.addressDetails?.city) {
      errors.city = "City is required.";
    }
    if (!formData.addressDetails?.postcode) {
      errors.postcode = "Postcode is required.";
    }
    if (!formData.contactDetails?.contactEmail) {
      errors.contactEmail = "Contact email is required.";
    }
    if (!formData.contactDetails?.contactNumber) {
      errors.contactPhone = "Contact phone is required.";
    }
  
    return errors;
  };
