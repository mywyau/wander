

import { DeskListingCard } from "@/types/desk/DeskListingCard";
import { SetStateAction } from "react";


interface DeskViewAllPagination {
    filteredDesks: DeskListingCard[];
    desksPerPage: number;
    totalPages: number;
    currentPage: number;
    setCurrentPage: (value: SetStateAction<number>) => void;
}

const DeskViewAllPagination: React.FC<DeskViewAllPagination> = (
    {
        filteredDesks,
        desksPerPage,
        totalPages,
        currentPage,
        setCurrentPage
    }
) => {
    return (
        filteredDesks.length > desksPerPage && (
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

export default DeskViewAllPagination;







