interface BusinessViewAllPaginationProps {
    submitError: string| null;
    successMessage: string| null;
}

const BusinessViewAllPagination: React.FC<BusinessViewAllPaginationProps> = ({
    submitError,
    successMessage,
}) => {
    return (
        <div className="mb-4">
            {submitError && <p className="text-xl text-red-500">{submitError}</p>}
            {successMessage && <p className="text-xl text-green-500">{successMessage}</p>}
        </div>
    );
};

export default BusinessViewAllPagination;
