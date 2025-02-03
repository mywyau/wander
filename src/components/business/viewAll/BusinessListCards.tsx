import { BusinessListingCard } from "@/types/business/BusinessListing";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu";

import {
    Building,
    List,
    Trash2
} from "lucide-react";
import { toast } from "sonner";

interface BusinessListingsCardsProp {
    filteredBusinesses: BusinessListingCard[];
    currentBusinesses: BusinessListingCard[];
    onDeleteSubmit: (businessId: string) => Promise<void>;
}

const BusinessListCards: React.FC<BusinessListingsCardsProp> = ({
    filteredBusinesses,
    currentBusinesses,
    onDeleteSubmit,
}) => {


    const [showNoBusinessMessage, setShowNoBusinessMessage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (filteredBusinesses.length === 0) {
            const timer = setTimeout(() => {
                setShowNoBusinessMessage(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShowNoBusinessMessage(false);
        }
    }, [filteredBusinesses]);


    const handleViewDetails = (businessId: string) => {
        router.push(`/business/detailed-view/${businessId}?timestamp=${Date.now()}`);
    };

    return filteredBusinesses.length === 0 && showNoBusinessMessage ? (
        <div className="text-center py-8">
            <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">
                No businesses available or found.
            </p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBusinesses.map((business) => (
                <ContextMenu key={business.businessId}>
                    {/* The entire card acts as the trigger for right-click */}
                    <ContextMenuTrigger asChild>
                        <Card className="transition-all bg-hardPurple hover:bg-softPurple cursor-pointer">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">{business.businessName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-sm">
                                    {business.description || "No description provided."}
                                </p>
                            </CardContent>
                        </Card>
                    </ContextMenuTrigger>

                    {/* Context Menu Content (Appears where user right clicks) */}
                    <ContextMenuContent className="w-56 bg-softPurple">
                        <ContextMenuItem onClick={() => handleViewDetails(business.businessId)}>
                            <List className="mr-2 w-4 h-4" />
                            <span>View Listing Details</span>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Building className="mr-2 w-4 h-4" />
                            <span>View Offices</span>
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem
                            onClick={
                                () => {
                                    onDeleteSubmit(business.businessId)
                                }
                            }>
                            <Trash2 className="mr-2 w-4 h-4 text-red-600" />
                            <span className="text-red-600">Delete Business</span>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ))}
        </div>
    );
};

export default BusinessListCards;
