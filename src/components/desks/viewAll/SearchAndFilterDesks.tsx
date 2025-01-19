import { SetStateAction } from "react";


interface SearchAndFilterDesksProps {
    searchQuery: string;
    setSearchQueryF: (value: SetStateAction<string>) => void;
}

const SearchAndFilterDesks: React.FC<SearchAndFilterDesksProps> = (
    {
        searchQuery,
        setSearchQueryF
    }
) => {
    return (
        <input
            type="text"
            placeholder="Search desks..."
            value={searchQuery}
            onChange={(e) => setSearchQueryF(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
        />
    )
}

export default SearchAndFilterDesks;