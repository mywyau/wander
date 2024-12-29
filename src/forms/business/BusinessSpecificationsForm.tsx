
import BusinessAvailability from "@/components/business/BusinessAvailability";
import TextArea from "@/components/business/TextArea";
import TextInput from "@/components/business/TextInput";
import { BusinessSpecifications } from "@/types/business/BusinessSpecifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { businessSpecificationsFormSchema } from "./schemas/BusinessSpecificationsFormSchema";


interface BusinessSpecificationsFormProps {
    onSubmit: (data: BusinessSpecifications) => Promise<void>;
    submitError?: string | null;
    successMessage?: string | null;
}

const BusinessSpecificationsForm: React.FC<BusinessSpecificationsFormProps> = ({
    onSubmit,
    submitError,
    successMessage,
}) => {

    const defaultValues = {
        businessName: "",
        description: "",
        availability: {
            days: [],
            startTime: "09:00",
            endTime: "17:00",
        },
    };

    const methods = useForm<BusinessSpecifications>({
        resolver: zodResolver(businessSpecificationsFormSchema),
        defaultValues,
        mode: "onSubmit",
    });

    const { register, formState: { errors } } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <h1 className="text-xl font-bold">Add Business Specifications</h1>

                {submitError && <p className="text-red-500">{submitError}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-6">

                        <TextInput
                            id="businessName"
                            name="businessName"
                            label="Business Name"
                            placeholder="Enter a name for the business"
                            register={register}
                            error={errors?.businessName?.message}
                            inputClassName="w-1/2"
                        />


                        <TextArea
                            id="description"
                            name="description"
                            label="Office Description"
                            register={register}
                            placeholder="Enter a short description of the office (text box can be expanded)"
                            error={errors.description?.message}
                            inputClassName="w-2/3"
                        />

                        <BusinessAvailability
                            days={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
                            namePrefix="availability"
                            register={register}
                            errors={errors.availability}
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

export default BusinessSpecificationsForm;