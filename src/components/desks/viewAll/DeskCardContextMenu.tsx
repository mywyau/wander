

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu";

import { DeskListingCard } from "@/types/desk/DeskListingCard";
import {
    List,
    Trash2
} from "lucide-react";

interface DeskCardWithContextMenuProp {
    deskCard: DeskListingCard;
    handleViewDetails: (deskId: string) => void;
    onDeleteSubmit: (deskId: string) => Promise<void>;
}


const DeskCardWithContextMenu: React.FC<DeskCardWithContextMenuProp> = ({
    deskCard,
    handleViewDetails,
    onDeleteSubmit,
}) => {

    return (
        <ContextMenu key={deskCard.deskId}>
            {/* The entire card acts as the trigger for right-click */}
            <ContextMenuTrigger asChild>
                <Card className="transition-all bg-main hover:bg-bg cursor-pointer">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">{deskCard.deskName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-black text-sm">
                            {deskCard.description || "No description provided."}
                        </p>
                    </CardContent>
                </Card>
            </ContextMenuTrigger>

            {/* Context Menu Content (Appears where user right clicks) */}
            <ContextMenuContent className="w-56 bg-bg">
                <ContextMenuItem onClick={() => handleViewDetails(deskCard.deskId)}>
                    <List className="mr-2 w-4 h-4" />
                    <span>View Desk Listing Details</span>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                    onClick={
                        () => {
                            onDeleteSubmit(deskCard.deskId)
                        }
                    }>
                    <Trash2 className="mr-2 w-4 h-4 text-red-600" />
                    <span className="text-red-600">Delete Desk</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default DeskCardWithContextMenu;