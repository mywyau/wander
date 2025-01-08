
interface DeleteAllBusinessListingsButtonProp {
    userId: string,
    onSubmit: (businessId: string) => Promise<void>
}

const DeleteAllBusinessListingsButton: React.FC<DeleteAllBusinessListingsButtonProp> = (
    {
        userId,
        onSubmit
    }
) => {
    return (
        <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={
                () => onSubmit(userId)
            }
        >
            Delete All Businesss
        </button>
    )
}

export default DeleteAllBusinessListingsButton;