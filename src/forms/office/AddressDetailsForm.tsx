import { useFormContext } from "react-hook-form";
import AddressInput from "@/components/AddressInput";
import TextInput from "../components/TextInput";

const AddressDetailsForm = () => {

    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                    type="text"
                    id="buildingName"
                    name="addressDetails.buildingName"
                    label="Building Name"
                    placeholder="Enter the name of the building"
                    register={register}
                    error={errors?.addressDetails?.buildingName?.message}
                />

                <AddressInput
                    id="street"
                    label="Street"
                    name="addressDetails.street"
                    placeholder="Enter the street name"
                    register={register}
                    error={errors?.addressDetails?.street?.message}
                />
                <AddressInput
                    id="city"
                    label="City"
                    name="addressDetails.city"
                    placeholder="Enter the city"
                    register={register}
                    error={errors?.addressDetails?.city?.message}
                />

                <AddressInput
                    id="county"
                    label="County"
                    name="addressDetails.county"
                    placeholder="Enter the county"
                    register={register}
                    error={errors?.addressDetails?.county?.message}
                />

                <AddressInput
                    id="country"
                    label="Country"
                    name="addressDetails.country"
                    placeholder="Enter the country"
                    register={register}
                    error={errors?.addressDetails?.country?.message}
                />

                <AddressInput
                    id="postcode"
                    label="Postcode"
                    name="addressDetails.postcode"
                    placeholder="Enter the postcode"
                    register={register}
                    error={errors?.addressDetails?.postcode?.message}
                />
            </div>
        </div >
    );
};

export default AddressDetailsForm;
