import { useFormContext } from "react-hook-form";
import Amenities from "../components/AmenitiesCheckbox";
import NumberInput from "../components/NumberInput";
import SelectField from "../components/SelectField";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";

const OfficeSpecsForm = () => {

  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          type="text"
          id="officeName"
          name="officeSpecs.officeName"
          label="Office Name"
          placeholder="Enter the office name"
          register={register}
          error={errors?.officeSpecs?.officeName?.message} // Extract the error message
          />
      </div>

      <TextArea
        id="description"
        name="officeSpecs.description"
        label="Description"
        register={register}
        placeholder="Enter a detailed description of the office"
        error={errors?.officeSpecs?.description}
      />

      <TextArea
        id="rules"
        name="officeSpecs.rules"
        label="Office Rules"
        register={register}
        placeholder="Enter any rules for the office"
        error={errors?.officeSpecs?.rules}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        <SelectField
          id="officeType"
          name="officeSpecs.officeType"
          label="Office Type"
          register={register}
          options={[
            { value: "ExecutiveOffice", label: "Executive Office" },
            { value: "OpenPlanOffice", label: "Open-plan Office" },
            { value: "PrivateOffice", label: "Private Office" },
          ]}
          error={errors?.officeSpecs?.officeType}
        />

        <NumberInput
          id="numberOfFloors"
          name="officeSpecs.numberOfFloors"
          label="Number of Floors"
          register={register}
          min={1}
          placeholder="Enter the number of floors"
          error={errors?.officeSpecs?.numberOfFloors}
        />

        <NumberInput
          id="capacity"
          name="officeSpecs.capacity"
          label="Capacity"
          register={register}
          min={1}
          placeholder="Enter the capacity"
          error={errors?.officeSpecs?.capacity}
        />

        <NumberInput
          id="totalDesks"
          name="officeSpecs.totalDesks"
          label="Total Desks"
          register={register}
          min={1}
          placeholder="Enter the total desks"
          error={errors?.officeSpecs?.totalDesks}
        />
      </div>

      <Amenities
        name="officeSpecs.amenities"
        amenities={["Wi-Fi", "Power Outlets", "Monitor", "Coffee", "Air Conditioning"]}
        register={register}
        error={errors?.officeSpecs?.amenities}
      />

    </div>
  );
};

export default OfficeSpecsForm;
