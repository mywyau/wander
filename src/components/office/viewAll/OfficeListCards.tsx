import { OfficeListingCard } from "@/types/office/OfficeListing";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


import OfficeCardContextMenu from "./OfficeCardContextMenu";

interface OfficeListingsCardsProp {
    filteredOfficeCards: OfficeListingCard[];
    currentOfficeCards: OfficeListingCard[];
    onDeleteSubmit: (officeId: string) => Promise<void>;
}

const OfficeListCards: React.FC<OfficeListingsCardsProp> = ({
    filteredOfficeCards,
    currentOfficeCards,
    onDeleteSubmit,
}) => {

    const [showNoOfficeMessage, setShowNoOfficeMessage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (filteredOfficeCards.length === 0) {
            const timer = setTimeout(() => {
                setShowNoOfficeMessage(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShowNoOfficeMessage(false);
        }
    }, [filteredOfficeCards]);


    const handleViewDetails = (businessId: string, officeId: string) => {
        router.push(`/office/detailed-view/${businessId}/${officeId}?timestamp=${Date.now()}`);
    };

    const handleViewAllDesks = (businessId: string, officeId: string) => {
        router.push(`/desk-listing/view-all/${businessId}/${officeId}?timestamp=${Date.now()}`);
    };

    return filteredOfficeCards.length === 0 && showNoOfficeMessage ? (
        <div className="text-center py-8">
            <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">
                No offices available or found.
            </p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                currentOfficeCards.map(
                    (card) => (
                        <OfficeCardContextMenu
                            officeCard={card}
                            handleViewDetails={handleViewDetails}
                            handleViewAllDesks={handleViewAllDesks}
                            onDeleteSubmit={onDeleteSubmit}
                        />
                    )
                )
            }
        </div>
    )
}

export default OfficeListCards;
