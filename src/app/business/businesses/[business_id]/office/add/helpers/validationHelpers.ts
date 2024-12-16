import { z } from "zod";

export const officeSpecsSchema =
  z.object({
    officeName: z.string().nonempty("Office name cannot be empty."),
    description: z.string().nonempty("Description is required for the office."),
    officeType: z.string().nonempty("Please select an office type."),
    numberOfFloors: z.number().min(1, "Number of floors must be at least 1."),
    capacity: z.number().min(1, "Capacity must be greater than 0."),
    totalDesks: z.number().min(1, "Capacity must be greater than 0."),
    amenities: z.array(z.string()).nonempty("At least one amenity must be selected."),
    availability: z.object({
      days: z.array(z.string()).nonempty("Availability days are required."),
      startTime: z.string().nonempty("Start time is required."),
      endTime: z.string().nonempty("End time is required."),
    }),
    rules: z.string().nonempty("Office rules cannot be empty."),
  });

export const addressDetailsSchema =
  z.object({
    buildingName: z.string().nonempty("Building name is required."),
    floorNumber: z.string().nonempty("Floor number is required."),
    street: z.string().nonempty("Street name is required."),
    city: z.string().nonempty("City is required."),
    country: z.string().nonempty("Country is required."),
    county: z.string().nonempty("County is required."),
    postcode: z.string().nonempty("Postcode is required."),
  });

export const contactDetailsSchema =
  z.object({
    primaryContactFirstName: z.string().nonempty("First name is required."),
    primaryContactLastName: z.string().nonempty("Last name is required."),
    contactEmail: z.string().email("Invalid email address."),
    contactNumber: z.string().nonempty("Contact number is required."),
  });
