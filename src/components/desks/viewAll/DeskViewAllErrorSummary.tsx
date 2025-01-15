interface DeskViewAllPaginationProps {
    submitError: string | null;
    successMessage: string | null;
}

const DeskViewAllPagination: React.FC<DeskViewAllPaginationProps> = ({
    submitError,
    successMessage,
}) => {
    return (
        <div className="mb-4">
            {submitError && <p className="text-red-500">{submitError}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
    );
};

export default DeskViewAllPagination;
