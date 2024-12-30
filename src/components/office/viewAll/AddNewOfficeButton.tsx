import { InitiateOfficeListingRequest } from "@/types/office/InitiateOfficeListingRequest";
import { IdGenerator } from "@/utils/idGenerator";

interface AddNewOfficeButtonProp {
    onSubmit: (data: InitiateOfficeListingRequest) => Promise<void>;
}

const AddNewOfficeButton: React.FC<AddNewOfficeButtonProp> = (
    {
        onSubmit
    }
) => {

    const randomBusinessId = IdGenerator.generateBusinessId();
    const randomOfficeId = IdGenerator.generateOfficeId();

    return (
        <button
            className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
            onClick={
                () => onSubmit(
                    {
                        businessId: randomBusinessId,
                        officeId: randomOfficeId,
                    }
                )
            }
        >
            Add New Office
        </button>
    )
}

export default AddNewOfficeButton;