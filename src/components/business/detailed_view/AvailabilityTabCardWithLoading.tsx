"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import BusinessOpeningDaysForm from "@/forms/business/BusinessOpeningDaysForm";
import BusinessOpeningHoursForm from "@/forms/business/BusinessOpeningHoursForm";
import { BusinessListing } from "@/types/business/BusinessListing";
import { OpeningHours } from "@/types/OpeningHours";
import { Dispatch, SetStateAction, useState } from "react";
import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuSeparator
} from "@/components/ui/context-menu";

import {
    List,
    Trash2
} from "lucide-react";

interface AvailabilityTabCardWithLoadingProps {
    businessId: string;
    businessDetails?: BusinessListing | null;
    loading: boolean;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AvailabilityTabCardWithLoading: React.FC<AvailabilityTabCardWithLoadingProps> = ({ businessId, businessDetails, loading }) => {
    const [businessOpeningHours, setBusinessOpeningHours] = useState<OpeningHours | null>(null);
    const [isSheetOpen, setSheetOpen] = useState(false); // Manage the sheet's visibility for days
    const [isEditSheetOpen, setEditSheetOpen] = useState(false); // Manage the sheet's visibility for editing times
    const [choseDay, setChoseDay] = useState<string>("");

    const DaysOpen = () => {
        const weekdayOrder: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const openingHours = businessDetails?.specifications?.openingHours;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weekdayOrder.map((day) => (
                    <ContextMenu key={day}>
                        {/* The entire card acts as the trigger for right-click */}
                        <ContextMenuTrigger asChild>
                            <Card key={day} className="border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-softRed">
                                <CardHeader>
                                    <CardTitle className="text-black font-bold">{day}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-black">
                                    <p><strong>Opening Time:</strong> {openingHours?.openingTime?.hour || "Not Set"}</p>
                                    <p><strong>Closing Time:</strong> {openingHours?.closingTime?.hour || "Not Set"}</p>
                                </CardContent>
                            </Card>
                        </ContextMenuTrigger>

                        {/* Context Menu Content (Appears where user right clicks) */}
                        <ContextMenuContent className="w-56 bg-white">
                            <ContextMenuItem
                                onClick={() => {
                                    setChoseDay(day); // Set the chosen day
                                    setEditSheetOpen(true); // Open the Edit Sheet
                                }}
                            >
                                <List className="mr-2 w-4 h-4" />
                                <span>Edit Opening Hours</span>
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem onClick={() => console.log("Delete Availability")}>
                                <Trash2 className="mr-2 w-4 h-4 text-red-600" />
                                <span className="text-red-600">Delete Availability</span>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                ))}
            </div>
        );
    };

    return (
        <Card variant="purple" className="pb-3 bg-softPurple">
            {
                loading ? (
                    <CardContent className="flex justify-center items-center h-auto">
                        <p className="text-center text-gray-600 text-xl font-semibold pt-6">
                            Loading your business opening hours details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader>
                            <div className="p-4 pb-1">
                                {/* First Sheet for editing days */}
                                <Sheet open={isSheetOpen} onOpenChange={(open) => setSheetOpen(open)}>
                                    <SheetTrigger asChild>
                                        <Button variant="green" className="w-1/4">Select Days Open</Button>
                                    </SheetTrigger>
                                    <SheetContent variant="purple" className="!w-full max-w-2xl">
                                        <SheetHeader>
                                            <SheetTitle className="flex mb-5">Update Availability</SheetTitle>
                                            <SheetDescription></SheetDescription>
                                        </SheetHeader>

                                        <BusinessOpeningDaysForm businessId={businessId} setBusinessOpeningHours={setBusinessOpeningHours} />

                                        <SheetFooter>
                                            <SheetClose asChild></SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            <div className="p-4 space-y-3">
                                <DaysOpen />
                            </div>
                        </CardContent>

                        {/* Second Sheet for editing opening hours for the chosen day */}
                        <Sheet open={isEditSheetOpen} onOpenChange={(open) => setEditSheetOpen(open)}>
                            <SheetTrigger asChild>
                                {/* Hidden SheetTrigger, sheet will open on context menu */}
                            </SheetTrigger>
                            <SheetContent variant="red" className="!w-full max-w-2xl">
                                <SheetHeader>
                                    <SheetTitle className="flex mb-5">Edit Opening Hours for {choseDay}</SheetTitle>
                                    <SheetDescription>Edit the opening and closing times for {choseDay}</SheetDescription>
                                </SheetHeader>

                                <BusinessOpeningHoursForm
                                    businessId={businessId}
                                    setBusinessOpeningHours={setBusinessOpeningHours}
                                    // chosenDay={choseDay}  // Send the chosen day to the form
                                />

                                <SheetFooter>
                                    <SheetClose asChild></SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                        <CardFooter className="" />
                    </>
                )
            }
        </Card>
    );
};

export default AvailabilityTabCardWithLoading;
