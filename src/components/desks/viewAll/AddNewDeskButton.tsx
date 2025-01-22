import { InitiateDeskListingRequest } from "@/types/desk/requests/InitiateDeskListingRequest";
import { IdGenerator } from "@/utils/idGenerator";

interface AddNewDeskButtonProp {
    businessId: string,
    officeId: string,
    onSubmit: (data: InitiateDeskListingRequest) => Promise<void>
}

const AddNewDeskButton: React.FC<AddNewDeskButtonProp> = (
    {
        businessId,
        officeId,
        onSubmit
    }
) => {

    const randomDeskId = IdGenerator.generateDeskId();

    const request: InitiateDeskListingRequest =
    {
        businessId: businessId,
        officeId: officeId,
        deskId: randomDeskId,
        deskName: "New Desk",
        description: "Please add a description",
    }

    return (
        <button
            className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
            onClick={
                () => onSubmit(request)
            }
        >
            Add New Desk
        </button>
    )
}

export default AddNewDeskButton;