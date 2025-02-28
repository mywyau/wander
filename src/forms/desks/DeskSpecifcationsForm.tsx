
import DeskFeatures from "@/components/desks/DeskFeatures";
import NumberInput from "@/components/desks/NumberInput";
import SelectField from "@/components/desks/SelectField";
import TextArea from "@/components/desks/TextArea";
import TextInput from "@/components/desks/TextInput";
import Availability from "@/components/office/OfficeAvailability";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { deskSpecificationsFormSchema } from "./schema/DeskSpecificationsFormSchema";
import { UpdateDeskSpecifications } from "@/types/desk/UpdateDeskSpecifications";


interface DeskSpecificationsFormProps {

    onSubmit: (data: UpdateDeskSpecifications) => Promise<void>;
    submitError?: string | null;
    successMessage?: string | null;
}

const DeskSpecificationsForm: React.FC<DeskSpecificationsFormProps> = ({
    onSubmit,
    submitError,
    successMessage,
}) => {

    const defaultValues = {
        deskName: "",
        description: "",
        deskType: "",
        quantity: 0,
        features: [],
        availability: {
            days: [],
            startTime: "09:00",
            endTime: "17:00",
        },
        rules: ""
    };

    const methods = useForm<UpdateDeskSpecifications>({
        resolver: zodResolver(deskSpecificationsFormSchema),
        defaultValues,
        mode: "onSubmit",
    });

    const { register, formState: { errors } } = methods;

    const featuresList = ["Air Conditioning", "Coffee", "Food", "Printer", "Parking", "Quiet Zones", "WiFi"];

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <h1 className="text-xl font-bold">Update Desk Specifications</h1>

                {submitError && <p className="text-red-500">{submitError}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-6">

                        <TextInput
                            id="deskName"
                            name="deskName"
                            label="Desk Name"
                            placeholder="Enter a name for the desk"
                            register={register}
                            error={errors?.deskName?.message}
                            inputClassName="w-1/2"
                        />

                        <TextArea
                            id="description"
                            name="description"
                            label="Desk Description"
                            register={register}
                            placeholder="Enter a short description of the desk (text box can be expanded)"
                            error={errors.description?.message}
                            inputClassName="w-2/3"
                        />

                        <TextArea
                            id="rules"
                            name="rules"
                            label="Desk Rules (optional)"
                            register={register}
                            placeholder="Enter any rules you want for the desk (text box can be expanded)"
                            error={errors.rules?.message}
                            inputClassName="w-2/3"
                        />

                        <SelectField
                            id="deskType"
                            name="deskType"
                            label="Type of Desk"
                            register={register}
                            options={[
                                { value: "CoworkingSpace", label: "Coworking Space" },
                                { value: "ExecutiveDesk", label: "Executive Desk" },
                                { value: "MeetingRoom", label: "Meeting Room" },
                                { value: "OpenPlanDesk", label: "Open Plan Desk" },
                                { value: "PrivateDesk", label: "Private Desk" }
                            ]}
                            error={errors.deskType}
                        />

                        <div className="w-1/2">
                            <div className="grid grid-cols-3 gap-4">

                                <NumberInput
                                    id="quantityOfDesks"
                                    name="quantityOfDesks"
                                    label="Desk Quantity"
                                    register={register}
                                    placeholder="Enter the total number of desk spaces for rent"
                                    error={errors.quantity?.message}
                                    inputClassName="w-1/3"
                                />
                            </div>
                        </div>

                        <DeskFeatures
                            deskFeatures={featuresList}
                            name="features"
                            register={register}
                            error={errors.features?.message}
                        />

                        <Availability
                            days={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
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

export default DeskSpecificationsForm;