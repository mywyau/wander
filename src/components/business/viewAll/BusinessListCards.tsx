
import { BusinessListingCard } from "@/types/business/BusinessListing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BusinessListingsCardsProp {
    filteredBusinesses: BusinessListingCard[];
    currentBusinesses: BusinessListingCard[];
    onDeleteLinkSubmit: (businessId: string) => Promise<void>;
}

const BusinessListCards: React.FC<BusinessListingsCardsProp> = ({
    filteredBusinesses,
    currentBusinesses,
    onDeleteLinkSubmit,
}) => {
    const [showNoBusinesssMessage, setShowNoBusinesssMessage] = useState(false);
    const router = useRouter(); // Get the router instance

    useEffect(() => {
        if (filteredBusinesses.length === 0) {
            const timer = setTimeout(() => {
                setShowNoBusinesssMessage(true);
            }, 1000); // Delay of 1 second
            return () => clearTimeout(timer); // Cleanup timer on component unmount
        } else {
            setShowNoBusinesssMessage(false);
        }
    }, [filteredBusinesses]);


    const handleViewDetails = (businessId: string) => {
        router.push(`/business/detailed-view/${businessId}?timestamp=${Date.now()}`);
    };

    return filteredBusinesses.length === 0 && showNoBusinesssMessage ? (
        <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No businesses found.</p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBusinesses.map(
                (business) => (
                    <div
                        key={business.businessId}
                        className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">{business.businessName}</h2>
                            <p className="text-gray-600 text-sm">
                                {business.description || "No description provided."}
                            </p>
                        </div>
                        <div className="mt-2 flex gap-6">
                            <button
                                className="text-base text-blue-600 rounded hover:text-blue-800 underline"
                                onClick={() => handleViewDetails(business.businessId)}
                            >
                                View listing
                            </button>
                            <button
                                className="text-base text-red-500 rounded hover:text-red-700 underline"
                                onClick={() => onDeleteLinkSubmit(business.businessId)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            )
            }
        </div>
    );
};

export default BusinessListCards;
