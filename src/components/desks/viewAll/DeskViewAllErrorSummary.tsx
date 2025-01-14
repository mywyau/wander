interface OfficeViewAllPaginationProps {
    submitError: string| null;
    successMessage: string| null;
}

const OfficeViewAllPagination: React.FC<OfficeViewAllPaginationProps> = ({
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

export default OfficeViewAllPagination;
