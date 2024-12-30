// OfficeAddressForm Component
import TextInput from "@/components/office/TextInput";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { officeAddressDetailsFormSchema } from "@/forms/office/schemas/OfficeAddressFormSchema";
import { CreateOfficeAddressDetails } from "@/types/office/CreateOfficeAddressDetails";

interface OfficeAddressFormProps {
  onSubmit: (data: CreateOfficeAddressDetails) => Promise<void>;
  submitError?: string | null;
  successMessage?: string | null;
}

const OfficeAddressDetailsForm: React.FC<OfficeAddressFormProps> = ({
  onSubmit,
  submitError,
  successMessage,
}) => {
    
  const defaultValues = {
    buildingName: "",
    street: "",
    city: "",
    country: "",
    county: "",
    postcode: "",
  };

  const methods = useForm<CreateOfficeAddressDetails>({
    resolver: zodResolver(officeAddressDetailsFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { register, formState: { errors } } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-xl font-bold">Add Office Address Details</h1>

        {submitError && <p className="text-red-500">{submitError}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <TextInput
              id="buildingName"
              name="buildingName"
              label="Building Name (optional)"
              placeholder="Enter the name of the building (if applicable)"
              register={register}
              error={errors?.buildingName?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="street"
              name="street"
              label="Street"
              placeholder="Enter the name of the street"
              register={register}
              error={errors?.street?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="city"
              name="city"
              label="City"
              placeholder="Enter the name of the city"
              register={register}
              error={errors?.city?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="country"
              name="country"
              label="Country"
              placeholder="Enter the a country"
              register={register}
              error={errors?.country?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="county"
              name="county"
              label="County"
              placeholder="Enter the a county"
              register={register}
              error={errors?.county?.message}
              inputClassName="w-1/2"
            />

            <TextInput
              id="postcode"
              name="postcode"
              label="Postcode"
              placeholder="Enter the the postcode"
              register={register}
              error={errors?.postcode?.message}
              inputClassName="w-1/2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-1/4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default OfficeAddressDetailsForm;