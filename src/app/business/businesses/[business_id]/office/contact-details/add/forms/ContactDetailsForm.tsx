import { useFormContext } from "react-hook-form";
import TextInput from "../components/TextInput";

const OfficeSpecsForm = () => {

    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                    type="text"
                    id="primaryContactFirstName"
                    name="contactDetails.primaryContactFirstName"
                    label="Primary Contact First Name"
                    placeholder="Enter a first name"
                    register={register}
                    error={errors?.contactDetails?.primaryContactFirstName?.message}
                />

                <TextInput
                    type="text"
                    id="primaryContactLastName"
                    name="contactDetails.primaryContactLastName"
                    label="Primary Contact Last Name"
                    placeholder="Enter a last name"
                    register={register}
                    error={errors?.contactDetails?.primaryContactLastName?.message}
                />

                <TextInput
                    type="text"
                    id="contactEmail"
                    name="contactDetails.contactEmail"
                    label="Contact Email"
                    placeholder="Enter an email address"
                    register={register}
                    error={errors?.contactDetails?.contactEmail?.message}
                />

                <TextInput
                    type="text"
                    id="contactNumber"
                    name="contactDetails.contactEmail"
                    label="Contact Number"
                    placeholder="Enter a phone number"
                    register={register}
                    error={errors?.contactDetails?.contactNumber?.message}
                />
            </div>
        </div>
    );
};

export default OfficeSpecsForm;
