import { DeskListingCard } from "@/types/desk/DeskListingCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DeskListingsCardsProp {
    filteredDesks: DeskListingCard[];
    currentDesks: DeskListingCard[];
    onDeleteLinkSubmit: (deskId: string) => Promise<void>;
}

const DeskListCards: React.FC<DeskListingsCardsProp> = ({
    filteredDesks,
    currentDesks,
    onDeleteLinkSubmit,
}) => {
    const [showNoDesksMessage, setShowNoDesksMessage] = useState(false);
    const router = useRouter(); // Get the router instance

    useEffect(() => {
        if (filteredDesks.length === 0) {
            const timer = setTimeout(() => {
                setShowNoDesksMessage(true);
            }, 1000); // Delay of 1 second
            return () => clearTimeout(timer); // Cleanup timer on component unmount
        } else {
            setShowNoDesksMessage(false);
        }
    }, [filteredDesks]);

    // Navigate programmatically to the detailed view page
    const handleViewDetails = (deskId: string) => {
        router.push(`/desk/detailed-view/${deskId}?timestamp=${Date.now()}`);
    };

    return filteredDesks.length === 0 && showNoDesksMessage ? (
        <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No desks found.</p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDesks.map(
                (desk) => (
                    <div
                        key={desk.deskId}
                        className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">{desk.deskName}</h2>
                            <p className="text-gray-600 text-sm">
                                {desk.description || "No description provided."}
                            </p>
                        </div>
                        <div className="mt-2 flex gap-6">
                            <button
                                className="text-base text-blue-600 rounded hover:text-blue-800 underline"
                                onClick={() => handleViewDetails(desk.deskId)}
                            >
                                View listing
                            </button>
                            <button
                                className="text-base text-red-500 rounded hover:text-red-700 underline"
                                onClick={() => onDeleteLinkSubmit(desk.deskId)}
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

export default DeskListCards;
