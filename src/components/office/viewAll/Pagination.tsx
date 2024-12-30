

import { OfficeListing } from "@/types/office/OfficeListing";
import { SetStateAction } from "react";


interface OfficeViewAllPagination {
    filteredOffices: OfficeListing[];
    officesPerPage: number;
    totalPages: number;
    currentPage: number;
    setCurrentPage: (value: SetStateAction<number>) => void;
}

const OfficeViewAllPagination: React.FC<OfficeViewAllPagination> = (
    {
        filteredOffices,
        officesPerPage,
        totalPages,
        currentPage,
        setCurrentPage
    }
) => {
    return (
        filteredOffices.length > officesPerPage && (
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

export default OfficeViewAllPagination;







