import { SetStateAction } from "react";


interface SearchAndFilterBusinesssProps {
    searchQuery: string;
    setSearchQueryF: (value: SetStateAction<string>) => void;
}

const SearchAndFilterBusinesss: React.FC<SearchAndFilterBusinesssProps> = (
    {
        searchQuery,
        setSearchQueryF
    }
) => {
    return (
        <input
            type="text"
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQueryF(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
        />
    )
}

export default SearchAndFilterBusinesss;