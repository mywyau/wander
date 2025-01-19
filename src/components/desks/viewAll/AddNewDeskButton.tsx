import { InitiateDeskListingRequest } from "@/types/desk/requests/InitiateDeskListingRequest";
import { IdGenerator } from "@/utils/idGenerator";

interface AddNewDeskButtonProp {
    officeId: string,
    onSubmit: (data: InitiateDeskListingRequest) => Promise<void>
}

const AddNewDeskButton: React.FC<AddNewDeskButtonProp> = (
    {
        officeId,
        onSubmit
    }
) => {

    const randomDeskId = IdGenerator.generateDeskId();

    const request: InitiateDeskListingRequest =
    {
        officeId: officeId,
        deskId: randomDeskId,
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