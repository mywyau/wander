

import { BusinessListingCard } from "@/types/business/BusinessListing";
import { SetStateAction } from "react";


interface BusinessViewAllPagination {
    filteredBusinesses: BusinessListingCard[];
    businessesPerPage: number;
    totalPages: number;
    currentPage: number;
    setCurrentPage: (value: SetStateAction<number>) => void;
}

const BusinessViewAllPagination: React.FC<BusinessViewAllPagination> = (
    {
        filteredBusinesses,
        businessesPerPage,
        totalPages,
        currentPage,
        setCurrentPage
    }
) => {
    return (
        filteredBusinesses.length > businessesPerPage && (
            <div className="flex justify-left mt-6">
                {
                    Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))
                }
            </div>
        )
    )
}

export default BusinessViewAllPagination;







