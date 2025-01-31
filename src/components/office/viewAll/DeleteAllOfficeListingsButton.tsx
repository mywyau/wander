
interface DeleteAllOfficeListingsButtonProp {
    businessId: string,
    onSubmit: (businessId: string) => Promise<void>
}

const DeleteAllOfficeListingsButton: React.FC<DeleteAllOfficeListingsButtonProp> = (
    {
        businessId,
        onSubmit
    }
) => {
    return (
        <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={
                () => onSubmit(businessId)
            }
        >
            Delete All Offices
        </button>
    )
}

export default DeleteAllOfficeListingsButton;