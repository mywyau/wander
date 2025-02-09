'use client'

import { Button } from '@/components/ui/button';

import BusinessSpecificationsForm from '@/forms/business/new_forms/BusinessSpecificationsForm';
import { BusinessListing, BusinessSpecifications } from "@/types/business/BusinessListing";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { useEffect, useState } from 'react';

interface TabCardWithLoadingProps {
    businessId: string;
    businessDetails?: BusinessListing | null;
    loading: boolean;
}

const TabCardWithLoading: React.FC<TabCardWithLoadingProps> = ({ businessId, businessDetails, loading }) => {

    const [businessSpecifications, setBusinessSpecifications] = useState<BusinessSpecifications | null>(null);

    //  Use `useEffect` to update state only when `businessDetails` changes
    useEffect(() => {
        if (businessDetails?.specifications) {
            setBusinessSpecifications(
                {
                    businessId: businessId,
                    businessName: businessDetails.specifications.businessName,
                    description: businessDetails.specifications.description,
                    availability: businessDetails.specifications.availability
                }
            );
        }
    }, [businessDetails]); // 🔄 Runs only when `businessDetails` changes


    const DaysOpen = () => {

        const weekdayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // Ensure businessDetails, specifications, and availability exist
        const availability = businessDetails?.specifications?.availability;

        if (!availability || !availability.days || availability.days.length === 0) {
            return <p className="text-gray-500">No availability data</p>;
        }

        const sortedDays =
            availability.days.sort(
                (a, b) => {
                    return (
                        weekdayOrder.indexOf(a) - weekdayOrder.indexOf(b)
                    )
                }
            )

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedDays.map((day) => (
                    <Card key={day} className="border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-softRed">
                        <CardHeader>
                            <CardTitle className="text-black font-bold">{day}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-black">
                            <p><strong>Opening Time:</strong> {availability?.startTime || "Not Set"}</p>
                            <p><strong>Closing Time:</strong> {availability?.endTime || "Not Set"}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <Card className="pb-3 bg-softBlue">
            {
                loading ? (
                    <CardContent className="flex justify-center items-center h-auto">
                        <p className="text-center text-gray-600 text-xl font-semibold pt-6">
                            Loading your business specifications details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader />
                        <CardContent className="space-y-2">

                            <div className="p-4 space-y-3">
                                <p><strong>Business Name:</strong> {businessSpecifications?.businessName || "N/A"}</p>
                                <p><strong>Description:</strong> {businessSpecifications?.description || "N/A"}</p>

                                <DaysOpen />
                            </div>

                        </CardContent>
                        <CardFooter className="">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="yellow" className="w-1/4">Edit</Button>
                                </SheetTrigger>
                                <SheetContent className="!w-full max-w-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="flex mb-5">Update Specifications Details</SheetTitle>
                                        <SheetDescription></SheetDescription>
                                    </SheetHeader>

                                    <BusinessSpecificationsForm businessId={businessId} setBusinessSpecifications={setBusinessSpecifications} />

                                    <SheetFooter>
                                        <SheetClose asChild></SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </CardFooter>
                    </>
                )}
        </Card>
    );
};

export default TabCardWithLoading;
