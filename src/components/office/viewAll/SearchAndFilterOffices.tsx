import { InitiateOfficeListingRequest } from "@/types/office/InitiateOfficeListingRequest";
import { SetStateAction } from "react";


interface SearchAndFilterOfficesProps {
    searchQuery: string;
    setSearchQueryF: (value: SetStateAction<string>) => void;
}

const SearchAndFilterOffices: React.FC<SearchAndFilterOfficesProps> = (
    {
        searchQuery,
        setSearchQueryF
    }
) => {
    return (
        <input
        type="text"
        placeholder="Search offices..."
        value={searchQuery}
        onChange={(e) => setSearchQueryF(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
    />
    )
}

export default SearchAndFilterOffices;