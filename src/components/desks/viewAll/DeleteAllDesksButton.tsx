
interface DeleteAllDeskListingsButtonProp {
    officeId: string,
    onSubmit: (officeId: string) => Promise<void>
}

const DeleteAllDeskListingsButton: React.FC<DeleteAllDeskListingsButtonProp> = (
    {
        officeId,
        onSubmit
    }
) => {
    return (
        <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={
                () => onSubmit(officeId)
            }
        >
            Delete All Desks
        </button>
    )
}

export default DeleteAllDeskListingsButton;