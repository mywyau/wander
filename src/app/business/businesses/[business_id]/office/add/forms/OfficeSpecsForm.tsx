import { useFormContext } from "react-hook-form";
import TextInput from "../components/TextInput";

const OfficeSpecsForm = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <TextInput
        type="text"
        id="officeName"
        name="officeName"
        label="Office Name"
        placeholder="Enter the office name"
        register={register}
        error={errors.officeName}
      />


    </div>
  );
};

export default OfficeSpecsForm;
