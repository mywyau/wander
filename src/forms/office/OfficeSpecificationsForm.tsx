
import NumberInput from "@/components/office/NumberInput";
import SelectField from "@/components/office/SelectField";
import TextArea from "@/components/office/TextArea";
import TextInput from "@/components/office/TextInput";
import { OfficeSpecifications } from "@/types/office/OfficeSpecifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { officeSpecificationsFormSchema } from "./schemas/OfficeSpecificationsFormSchema";
import Amenities from "@/components/office/Amenities";
import Availability from "@/components/office/OfficeAvailability";


interface OfficeSpecificationsFormProps {
    onSubmit: (data: OfficeSpecifications) => Promise<void>;
    submitError?: string | null;
    successMessage?: string | null;
}

const OfficeSpecificationsForm: React.FC<OfficeSpecificationsFormProps> = ({
    onSubmit,
    submitError,
    successMessage,
}) => { 

    const defaultValues = {
        officeName: "",
        description: "",
        officeType: "",
        numberOfFloors: 0,
        totalDesks: 0,
        capacity: 0,
        amenities: [],
        availability: {
            days: [],
            startTime: "09:00",
            endTime: "17:00",
        },
        rules: "",
    };

    const methods = useForm<OfficeSpecifications>({
        resolver: zodResolver(officeSpecificationsFormSchema),
        defaultValues,
        mode: "onSubmit",
    });

    const { register, formState: { errors } } = methods;

    const amenitiesList = ["Air Conditioning", "Coffee", "Food", "Printer", "Parking", "Quiet Zones", "WiFi"];

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <h1 className="text-xl font-bold">Add Office Specifications</h1>

                {submitError && <p className="text-red-500">{submitError}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-6">

                        <TextInput
                            id="officeName"
                            name="officeName"
                            label="Office Name"
                            placeholder="Enter a name for the office"
                            register={register}
                            error={errors?.officeName?.message}
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

                        <TextArea
                            id="rules"
                            name="rules"
                            label="Office Rules (optional)"
                            register={register}
                            placeholder="Enter any rules you want for the office (text box can be expanded)"
                            error={errors.rules?.message}
                            inputClassName="w-2/3"
                        />

                        <SelectField
                            id="officeType"
                            name="officeType"
                            label="Type of Office"
                            register={register}
                            options={[
                                { value: "CoworkingSpace", label: "Coworking Space" },
                                { value: "OpenPlanOffice", label: "Open Plan Office" },
                                { value: "PrivateOffice", label: "Private Office" },
                                { value: "ExecutiveOffice", label: "Executive Office" },
                                { value: "MeetingRoom", label: "Meeting Room" },
                            ]}
                            error={errors.officeType}
                        />

                        <div className="w-1/2">
                            <div className="grid grid-cols-3 gap-4">

                                <NumberInput
                                    id="numberOfFloors"
                                    name="numberOfFloors"
                                    label="Number Of Floors"
                                    register={register}
                                    placeholder="Enter the number of floors"
                                    error={errors.numberOfFloors?.message}
                                    inputClassName="w-full"
                                />

                                <NumberInput
                                    id="capacity"
                                    name="capacity"
                                    label="Capacity"
                                    register={register}
                                    placeholder="Enter the capacity of the office"
                                    error={errors.capacity?.message}
                                    inputClassName="w-full"
                                />

                                <NumberInput
                                    id="totalDesks"
                                    name="totalDesks"
                                    label="Total Number of Desks"
                                    register={register}
                                    placeholder="Enter the total number of desks in the office"
                                    error={errors.totalDesks?.message}
                                    inputClassName="w-full"
                                />
                            </div>
                        </div>

                        <Amenities
                            amenities={amenitiesList}
                            name="amenities"
                            register={register}
                            error={errors.amenities?.message}
                        />

                        <Availability
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

export default OfficeSpecificationsForm;