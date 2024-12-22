import TextInput from "@/components/business/TextInput";
import NumberInput from "@/components/office/NumberInput";
import { useFormContext } from "react-hook-form";

const AddressDetailsForm = () => {

    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">

            <div className="grid grid-cols-1 gap-6">

                <TextInput
                    type="text"
                    id="buildingName"
                    name="buildingName"
                    label="Building Name (optional)"
                    placeholder="Enter the name of the building (if applicable)"
                    register={register}
                    error={errors?.buildingName?.message}
                    className="w-1/2"
                />

                <TextInput
                    type="text"
                    id="street"
                    name="street"
                    label="Street"
                    placeholder="Enter the name of the street"
                    register={register}
                    error={errors?.street?.message}
                    className="w-1/2"
                />

                <TextInput
                    type="text"
                    id="city"
                    name="city"
                    label="City"
                    placeholder="Enter the name of the city"
                    register={register}
                    error={errors?.city?.message}
                    className="w-1/2"
                />


                <TextInput
                    type="text"
                    id="country"
                    name="country"
                    label="Country"
                    placeholder="Enter name of the country"
                    register={register}
                    error={errors?.country?.message}
                    className="w-1/2"
                />

                <TextInput
                    type="text"
                    id="county"
                    name="county"
                    label="County"
                    placeholder="Enter the name of the county"
                    register={register}
                    error={errors?.county?.message}
                    className="w-1/2"
                />

                <TextInput
                    type="text"
                    id="postcode"
                    name="postcode"
                    label="Postcode"
                    placeholder="Enter the postcode"
                    register={register}
                    error={errors?.postcode?.message}
                    className="w-1/2"
                />
            </div>
        </div >
    );
};

export default AddressDetailsForm;
