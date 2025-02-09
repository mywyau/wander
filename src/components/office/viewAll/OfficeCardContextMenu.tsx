

import { OfficeListingCard } from "@/types/office/OfficeListing";
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

interface OfficeCardWithContextMenuProp {
    officeCard: OfficeListingCard;
    handleViewDetails: (businessId: string, officeId: string) => void;
    handleViewAllDesks: (officeId: string) => void;
    onDeleteSubmit: (officeId: string) => Promise<void>;
}


const OfficeCardWithContextMenu: React.FC<OfficeCardWithContextMenuProp> = ({
    officeCard,
    handleViewDetails,
    handleViewAllDesks,
    onDeleteSubmit,
}) => {

    return (
        <ContextMenu key={officeCard.officeId}>
            {/* The entire card acts as the trigger for right-click */}
            <ContextMenuTrigger asChild>
                <Card className="transition-all bg-hardRed hover:bg-softRed cursor-pointer">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">{officeCard.officeName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-black text-sm">
                            {officeCard.description || "No description provided."}
                        </p>
                    </CardContent>
                </Card>
            </ContextMenuTrigger>

            {/* Context Menu Content (Appears where user right clicks) */}
            <ContextMenuContent className="w-56 bg-softRed">
                <ContextMenuItem onClick={() => handleViewDetails(officeCard.businessId, officeCard.officeId)}>
                    <List className="mr-2 w-4 h-4" />
                    <span>View Office Details</span>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleViewAllDesks(officeCard.officeId)}>
                    <Building className="mr-2 w-4 h-4" />
                    <span>View Desks</span>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                    onClick={
                        () => {
                            onDeleteSubmit(officeCard.officeId)
                        }
                    }>
                    <Trash2 className="mr-2 w-4 h-4 text-red-600" />
                    <span className="text-red-600">Delete Office</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default OfficeCardWithContextMenu;