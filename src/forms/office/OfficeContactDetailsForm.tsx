// OfficeContactForm Component
import TextInput from "@/components/office/TextInput";
import { CreateOfficeContactDetails } from "@/types/office/CreateOfficeContactDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { officeContactDetailsFormSchema } from "./schemas/OfficeContactDetailsFormSchema";

interface OfficeContactFormProps {
    onSubmit: (data: CreateOfficeContactDetails) => Promise<void>;
    submitError?: string | null;
    successMessage?: string | null;
}

const OfficeContactDetailsForm: React.FC<OfficeContactFormProps> = ({
    onSubmit,
    submitError,
    successMessage,
}) => {

    const defaultValues = {
        primaryContactFirstName: "",
        primaryContactLastName: "",
        contactEmail: "",
        contactNumber: ""
    };

    const methods = useForm<CreateOfficeContactDetails>({
        resolver: zodResolver(officeContactDetailsFormSchema),
        defaultValues,
        mode: "onSubmit",
    });

    const { register, formState: { errors } } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <h1 className="text-xl font-bold">Add Office Contact Details</h1>

                {submitError && <p className="text-red-500">{submitError}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-6">
                        <TextInput
                            id="primaryContactFirstName"
                            name="primaryContactFirstName"
                            label="Primary Contact First Name"
                            placeholder="Enter a first name"
                            register={register}
                            error={errors?.primaryContactFirstName?.message}
                            inputClassName="w-1/2"
                        />

                        <TextInput
                            id="primaryContactLastName"
                            name="primaryContactLastName"
                            label="Primary Contact Last Name"
                            placeholder="Enter a last name"
                            register={register}
                            error={errors?.primaryContactLastName?.message}
                            inputClassName="w-1/2"
                        />

                        <TextInput
                            id="contactEmail"
                            name="contactEmail"
                            label="Email"
                            placeholder="Enter an email"
                            register={register}
                            error={errors?.contactEmail?.message}
                            inputClassName="w-1/2"
                        />

                        <TextInput
                            id="contactNumber"
                            name="contactNumber"
                            label="Contact Number"
                            placeholder="Enter a phone number"
                            register={register}
                            error={errors?.contactNumber?.message}
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

export default OfficeContactDetailsForm;