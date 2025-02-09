
import { SetStateAction } from "react";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';

interface OfficeCardPaginationProps {
    currentPage: number;
    setCurrentPage: (value: SetStateAction<number>) => void
    totalPages: number;
}


const OfficeCardPagination: React.FC<OfficeCardPaginationProps> = ({
    currentPage,
    setCurrentPage,
    totalPages
}) => {

    return (
        <Pagination className="mx-auto flex w-full justify-start mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        disabled={currentPage === 1}
                        activeClassNames="bg-hardRed text-black"
                        className="bg-softRed text-black"
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {
                    Array.from({ length: totalPages }).map(
                        (_, index) => {

                            const pageNumber = index + 1;

                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === pageNumber}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(pageNumber);
                                        }}
                                        activeClassNames="bg-hardRed text-black"
                                        className="bg-softRed text-black"
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        }
                    )
                }

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        activeClassNames="bg-hardRed text-black"
                        className="bg-softRed text-black"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default OfficeCardPagination;