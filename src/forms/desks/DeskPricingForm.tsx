
import Amenities from "@/components/desks/DeskFeatures";
import NumberInput from "@/components/desks/NumberInput";
import Availability from "@/components/office/OfficeAvailability";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { deskListingFormSchema } from "./schema/DeskListingFormSchema";
import { deskPricingFormSchema } from "./schema/DeskPricingFormSchema";
import { UpdateDeskPricing } from "@/types/desk/UpdateDeskPricing";


interface DeskPricingFormProps {

    onSubmit: (data: UpdateDeskPricing) => Promise<void>;
    submitError?: string | null;
    successMessage?: string | null;
}

const DeskPricingForm: React.FC<DeskPricingFormProps> = ({
    onSubmit,
    submitError,
    successMessage,
}) => {

    const defaultValues = {
        pricePerHour: 0,
        pricePerDay: 0,
        pricePerWeek: 0,
        pricePerYear: 0
    };

    const methods = useForm<UpdateDeskPricing>({
        resolver: zodResolver(deskPricingFormSchema),
        defaultValues,
        mode: "onSubmit",
    });

    const { register, formState: { errors } } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <h1 className="text-xl font-bold">Update Desk Pricing</h1>

                {submitError && <p className="text-red-500">{submitError}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-6">

                        <div className="w-1/2">
                            <div className="grid grid-cols-3 gap-4">

                                <NumberInput
                                    id="pricePerHour"
                                    name="pricePerHour"
                                    label="Price per hour"
                                    register={register}
                                    placeholder="Enter the price of the desk per hour"
                                    error={errors.pricePerHour?.message}
                                    inputClassName="w-full"
                                />

                                <NumberInput
                                    id="pricePerDay"
                                    name="pricePerDay"
                                    label="Price per day"
                                    register={register}
                                    placeholder="Enter the price of the desk per day"
                                    error={errors.pricePerDay?.message}
                                    inputClassName="w-full"
                                />
                                <NumberInput
                                    id="pricePerWeek"
                                    name="pricePerWeek"
                                    label="Price per week"
                                    register={register}
                                    placeholder="Enter the price of the desk per week"
                                    error={errors.pricePerWeek?.message}
                                    inputClassName="w-full"
                                />
                                <NumberInput
                                    id="pricePerYear"
                                    name="pricePerYear"
                                    label="Price per year"
                                    register={register}
                                    placeholder="Enter the price of the desk per year"
                                    error={errors.pricePerYear?.message}
                                    inputClassName="w-full"
                                />
                            </div>
                        </div>
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

export default DeskPricingForm;