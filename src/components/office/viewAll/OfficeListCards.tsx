import { OfficeListingCard } from "@/types/office/OfficeListing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OfficeListingsCardsProp {
    filteredOffices: OfficeListingCard[];
    currentOffices: OfficeListingCard[];
    onDeleteLinkSubmit: (officeId: string) => Promise<void>;
}

const OfficeListCards: React.FC<OfficeListingsCardsProp> = ({
    filteredOffices,
    currentOffices,
    onDeleteLinkSubmit,
}) => {
    const [showNoOfficesMessage, setShowNoOfficesMessage] = useState(false);
    const router = useRouter(); // Get the router instance

    useEffect(() => {
        if (filteredOffices.length === 0) {
            const timer = setTimeout(() => {
                setShowNoOfficesMessage(true);
            }, 1000); // Delay of 1 second
            return () => clearTimeout(timer); // Cleanup timer on component unmount
        } else {
            setShowNoOfficesMessage(false);
        }
    }, [filteredOffices]);

    // Navigate programmatically to the detailed view page
    const handleViewDetails = (officeId: string) => {
        router.push(`/office/detailed-view/${officeId}?timestamp=${Date.now()}`);
    };

    return filteredOffices.length === 0 && showNoOfficesMessage ? (
        <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No offices found.</p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentOffices.map(
                (office) => (
                    <div
                        key={office.officeId}
                        className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">{office.officeName}</h2>
                            <p className="text-gray-600 text-sm">
                                {office.description || "No description provided."}
                            </p>
                        </div>
                        <div className="mt-2 flex gap-6">
                            <button
                                className="text-base text-blue-600 rounded hover:text-blue-800 underline"
                                onClick={() => handleViewDetails(office.officeId)}
                            >
                                View listing
                            </button>
                            <button
                                className="text-base text-red-500 rounded hover:text-red-700 underline"
                                onClick={() => onDeleteLinkSubmit(office.officeId)}
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

export default OfficeListCards;
