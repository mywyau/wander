import { InitiateBusinessListingRequest } from "@/types/business/InitiateBusinessListingRequest";
import { IdGenerator } from "@/utils/idGenerator";

interface AddNewBusinessButtonProp {
    onSubmit: (data: InitiateBusinessListingRequest) => Promise<void>;
}

const AddNewBusinessButton: React.FC<AddNewBusinessButtonProp> = (
    {
        onSubmit
    }
) => {

    const randomBusinessId = IdGenerator.generateBusinessId();

    return (
        <button
            className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
            onClick={
                () => onSubmit(
                    {
                        businessId: randomBusinessId
                    }
                )
            }
        >
            Add New Business
        </button>
    )
}

export default AddNewBusinessButton;