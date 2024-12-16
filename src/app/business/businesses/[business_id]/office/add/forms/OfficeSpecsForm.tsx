import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AmenitiesCheckbox from "../components/AmenitiesCheckbox";
import NumberInput from "../components/NumberInput";
import OpeningHours from "../components/OpeningHours";
import SelectField from "../components/SelectInputField";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import { officeSpecsSchema } from "../helpers/validationHelpers";

const OfficeSpecsForm = () => {

  type OfficeFormData = z.infer<typeof officeSpecsSchema>;

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OfficeFormData>({
    resolver: zodResolver(officeSpecsSchema),
  });

  const formData = watch(); // To watch current form state

  return (
    <div className="space-y-4">
      <TextInput
        type="text"
        id="officeName"
        label="Office Name"
        {...register("officeName")} // React Hook Form registration
        placeholder="Enter the office name"
        error={errors.officeName?.message} // Optional chaining
      />

      <TextArea
        value={""}
        id="description"
        label="Description"
        {...register("description")}
        placeholder="Enter a description of the office"
        error={errors.description?.message} />

      <TextArea
        value={""}
        id="rules"
        label="Office Rules"
        {...register("rules")}
        placeholder="Enter any rules for the office"
        error={errors.rules?.message} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          id="officeType"
          label="Office Type"
          {...register("officeType")}
          options={[
            { value: "ExecutiveOffice", label: "Executive Office" },
            { value: "OpenPlanOffice", label: "Open-plan Office" },
            { value: "PrivateOffice", label: "Private Office" },
          ]}
          error={errors.officeType?.message}
        />

        <NumberInput
          id="numberOfFloors"
          label="Number of Floors"
          {...register("numberOfFloors", { valueAsNumber: true })}
          min={1}
          placeholder="Enter the number of floors"
          error={errors.numberOfFloors?.message}
        />

        <NumberInput
          id="totalDesks"
          label="Total Desks"
          {...register("totalDesks", { valueAsNumber: true })}
          min={1}
          placeholder="Enter the total number of desks"
          error={errors.totalDesks?.message} />

        <NumberInput
          id="capacity"
          label="Capacity"
          {...register("capacity", { valueAsNumber: true })}
          min={1}
          placeholder="Enter the capacity"
          error={errors.capacity?.message}
        />
      </div>

      <OpeningHours
        days={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
        selectedDays={formData.officeSpecs?.availability?.days || []}
        startTime={formData.officeSpecs?.availability?.startTime || ""}
        endTime={formData.officeSpecs?.availability?.endTime || ""}
        onDayChange={(days) => setValue("officeSpecs.availability.days", days)}
        onTimeChange={(time, key) => setValue(`officeSpecs.availability.${key}`, time)}
        errors={{
          startTime: errors.officeSpecs?.availability?.startTime?.message,
          endTime: errors.officeSpecs?.availability?.endTime?.message,
        }}
      />

      <AmenitiesCheckbox
        amenities={["Wi-Fi", "Power Outlets", "Monitor", "Coffee", "Air Conditioning"]}
        selectedAmenities={formData.officeSpecs?.amenities || []}
        onChange={(selected) => setValue("officeSpecs.amenities", selected)}
      />
    </div>
  );
};

export default OfficeSpecsForm;
