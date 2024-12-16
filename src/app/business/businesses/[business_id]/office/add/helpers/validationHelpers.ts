import { z } from "zod";

export const officeSpecsSchema = z.object({
  officeName:
    z
      .string()
      .nonempty("Office name cannot be empty.")
      .min(3, "Office name must be at least 3 characters.")
      .max(50, "Office name cannot exceed 50 characters."),
  description:
    z
      .string()
      .nonempty("Description is required for the office.")
      .min(10, "Description must be at least 10 characters.")
      .max(300, "Description cannot exceed 300 characters."),
  officeType:
    z
      .string()
      .nonempty("Please select an office type.")
      .min(3, "Office type must be at least 3 characters.")
      .max(20, "Office type cannot exceed 20 characters."),
  numberOfFloors:
    z
      .number()
      .min(1, "Number of floors must be at least 1.")
      .max(100, "Number of floors cannot exceed 100."),
  capacity:
    z
      .number()
      .min(1, "Capacity must be greater than 0.")
      .max(1000, "Capacity cannot exceed 1000."),
  totalDesks:
    z
      .number()
      .min(1, "Total desks must be greater than 0.")
      .max(1000, "Total desks cannot exceed 1000."),
  amenities:
    z
      .array(z.string())
      .nonempty("At least one amenity must be selected."),
  availability: z.object({
    days:
      z
        .array(z.string())
        .nonempty("Availability days are required."),
    startTime:
      z
        .string()
        .nonempty("Start time is required.")
        .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Start time must be in HH:mm format."),
    endTime:
      z
        .string()
        .nonempty("End time is required.")
        .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:mm format."),
  }),
  rules:
    z
      .string()
      .nonempty("Office rules cannot be empty.")
      .min(5, "Rules must be at least 5 characters.")
      .max(200, "Rules cannot exceed 200 characters."),
});


export const addressDetailsSchema = z.object({
  buildingName: z
    .string()
    .nonempty("Building name is required.")
    .min(2, "Building name must be at least 2 characters.")
    .max(50, "Building name cannot exceed 50 characters."),
  floorNumber: z
    .string()
    .nonempty("Floor number is required.")
    .regex(/^\d+$/, "Floor number must be numeric.")
    .min(1, "Floor number must be at least 1 character.")
    .max(5, "Floor number cannot exceed 5 characters."),
  street: z
    .string()
    .nonempty("Street name is required.")
    .min(3, "Street name must be at least 3 characters.")
    .max(100, "Street name cannot exceed 100 characters."),
  city: z
    .string()
    .nonempty("City is required.")
    .min(2, "City name must be at least 2 characters.")
    .max(50, "City name cannot exceed 50 characters."),
  country: z
    .string()
    .nonempty("Country is required.")
    .min(2, "Country name must be at least 2 characters.")
    .max(50, "Country name cannot exceed 50 characters."),
  county: z
    .string()
    .nonempty("County is required.")
    .min(2, "County name must be at least 2 characters.")
    .max(50, "County name cannot exceed 50 characters."),
  postcode: z
    .string()
    .nonempty("Postcode is required.")
    .regex(/^[A-Za-z0-9\s-]+$/, "Postcode must only contain letters, numbers, spaces, or hyphens.")
    .min(5, "Postcode must be at least 5 characters.")
    .max(10, "Postcode cannot exceed 10 characters."),
});

export const contactDetailsSchema = z.object({
  primaryContactFirstName: z
    .string()
    .nonempty("First name is required.")
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters.")
    .regex(/^[A-Za-z\s'-]+$/, "First name can only contain letters, spaces, hyphens, or apostrophes."),
  primaryContactLastName: z
    .string()
    .nonempty("Last name is required.")
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters.")
    .regex(/^[A-Za-z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, or apostrophes."),
  contactEmail: z
    .string()
    .email("Invalid email address.")
    .max(100, "Email address cannot exceed 100 characters."),
  contactNumber: z
    .string()
    .nonempty("Contact number is required.")
    .regex(
      /^(\+?\d{1,4}[\s-])?(\d{10}|\d{3}[\s-]\d{3}[\s-]\d{4})$/,
      "Contact number must be a valid phone number."
    )
    .min(10, "Contact number must be at least 10 digits.")
    .max(15, "Contact number cannot exceed 15 digits."),
});
