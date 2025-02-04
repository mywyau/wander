

import { BusinessListingCard } from "@/types/business/BusinessListing";
import React from "react";

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

interface BusinessCardWithContextMenuProp {
    businessCard: BusinessListingCard;
    handleViewDetails: (businessId: string) => void;
    handleViewAllOffices: (businessId: string) => void;
    onDeleteSubmit: (businessId: string) => Promise<void>;
}


const BusinessCardWithContextMenu: React.FC<BusinessCardWithContextMenuProp> = ({
    businessCard,
    handleViewDetails,
    handleViewAllOffices,
    onDeleteSubmit,
}) => {

    return (
        <ContextMenu key={businessCard.businessId}>
            {/* The entire card acts as the trigger for right-click */}
            <ContextMenuTrigger asChild>
                <Card className="transition-all bg-hardPurple hover:bg-softPurple cursor-pointer">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">{businessCard.businessName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-black text-sm">
                            {businessCard.description || "No description provided."}
                        </p>
                    </CardContent>
                </Card>
            </ContextMenuTrigger>

            {/* Context Menu Content (Appears where user right clicks) */}
            <ContextMenuContent className="w-56 bg-softPurple">
                <ContextMenuItem onClick={() => handleViewDetails(businessCard.businessId)}>
                    <List className="mr-2 w-4 h-4" />
                    <span>View Listing Details</span>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleViewAllOffices(businessCard.businessId)}>
                    <Building className="mr-2 w-4 h-4" />
                    <span>View Offices</span>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                    onClick={
                        () => {
                            onDeleteSubmit(businessCard.businessId)
                        }
                    }>
                    <Trash2 className="mr-2 w-4 h-4 text-red-600" />
                    <span className="text-red-600">Delete Business</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default BusinessCardWithContextMenu;