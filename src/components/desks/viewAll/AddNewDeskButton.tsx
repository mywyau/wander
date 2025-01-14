import { InitiateOfficeListingRequest } from "@/types/office/InitiateOfficeListingRequest";
import { IdGenerator } from "@/utils/idGenerator";

interface AddNewOfficeButtonProp {
    businessId: string,
    onSubmit: (data: InitiateOfficeListingRequest) => Promise<void>
}

const AddNewOfficeButton: React.FC<AddNewOfficeButtonProp> = (
    {
        businessId,
        onSubmit
    }
) => {

    const randomOfficeId = IdGenerator.generateOfficeId();

    const request: InitiateOfficeListingRequest =
    {
        businessId: businessId,
        officeId: randomOfficeId,
    }

    return (
        <button
            className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
            onClick={
                () => onSubmit(request)
            }
        >
            Add New Office
        </button>
    )
}

export default AddNewOfficeButton;