import { BusinessListingCard } from "@/types/business/BusinessListing";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


import BusinessCardContextMenu from "./BusinessCardContextMenu";

interface BusinessListingsCardsProp {
    filteredBusinessCards: BusinessListingCard[];
    currentBusinessCards: BusinessListingCard[];
    onDeleteSubmit: (businessId: string) => Promise<void>;
}

const BusinessListCards: React.FC<BusinessListingsCardsProp> = ({
    filteredBusinessCards,
    currentBusinessCards,
    onDeleteSubmit,
}) => {

    const [showNoBusinessMessage, setShowNoBusinessMessage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (filteredBusinessCards.length === 0) {
            const timer = setTimeout(() => {
                setShowNoBusinessMessage(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShowNoBusinessMessage(false);
        }
    }, [filteredBusinessCards]);


    const handleViewDetails = (businessId: string) => {
        router.push(`/business/detailed-view/${businessId}?timestamp=${Date.now()}`);
    };

    const handleViewAllOffices = (businessId: string) => {
        router.push(`/office/view-all/${businessId}?timestamp=${Date.now()}`);
    };

    return filteredBusinessCards.length === 0 && showNoBusinessMessage ? (
        <div className="text-center py-8">
            <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">
                No businesses available or found.
            </p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                currentBusinessCards.map(
                    (card) => (
                        <BusinessCardContextMenu
                            businessCard={card}
                            handleViewDetails={handleViewDetails}
                            handleViewAllOffices={handleViewAllOffices}
                            onDeleteSubmit={onDeleteSubmit}
                        />
                    )
                )
            }
        </div>
    )
}

export default BusinessListCards;
