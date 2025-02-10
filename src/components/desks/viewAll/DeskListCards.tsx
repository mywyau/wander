import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


import DeskCardContextMenu from "./DeskCardContextMenu";
import { DeskListingCard } from "@/types/desk/DeskListingCard";

interface DeskListingsCardsProp {
    filteredDeskCards: DeskListingCard[];
    currentDeskCards: DeskListingCard[];
    onDeleteSubmit: (deskId: string) => Promise<void>;
}

const DeskListCards: React.FC<DeskListingsCardsProp> = ({
    filteredDeskCards,
    currentDeskCards,
    onDeleteSubmit,
}) => {

    const [showNoDeskMessage, setShowNoDeskMessage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (filteredDeskCards.length === 0) {
            const timer = setTimeout(() => {
                setShowNoDeskMessage(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShowNoDeskMessage(false);
        }
    }, [filteredDeskCards]);


    const handleViewDetails = (deskId: string) => {
        router.push(`/desk-listing/detailed-view/${deskId}?timestamp=${Date.now()}`);
    };

    return filteredDeskCards.length === 0 && showNoDeskMessage ? (
        <div className="text-center py-8">
            <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">
                No desks available or found.
            </p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                currentDeskCards.map(
                    (card) => (
                        <DeskCardContextMenu
                            deskCard={card}
                            handleViewDetails={handleViewDetails}
                            onDeleteSubmit={onDeleteSubmit}
                        />
                    )
                )
            }
        </div>
    )
}

export default DeskListCards;
