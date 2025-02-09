'use client'

import { Button } from '@/components/ui/button';

import { OfficeListing, OfficeSpecifications } from "@/types/office/OfficeListing";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { useEffect, useState } from 'react';
import OfficeSpecificationsForm from '@/forms/office/OfficeSpecificationsForm';

interface TabCardWithLoadingProps {
    businessId: string;
    officeId: string;
    officeDetails?: OfficeListing | null;
    loading: boolean;
}

const TabCardWithLoading: React.FC<TabCardWithLoadingProps> = ({businessId, officeId, officeDetails, loading }) => {

    const [officeSpecifications, setOfficeSpecifications] = useState<OfficeSpecifications | null>(null);

    //  Use `useEffect` to update state only when `officeDetails` changes
    useEffect(() => {
        if (officeDetails?.specifications) {
            setOfficeSpecifications(
                {
                    businessId: businessId,
                    officeId: officeId,
                    officeName: officeDetails.specifications.officeName,
                    description: officeDetails.specifications.description,
                    officeType: officeDetails.specifications.officeType,
                    numberOfFloors: officeDetails.specifications.numberOfFloors,
                    totalDesks: officeDetails.specifications.totalDesks,
                    capacity: officeDetails.specifications.capacity,
                    amenities: officeDetails.specifications.amenities,
                    availability: officeDetails.specifications.availability,
                    rules: officeDetails.specifications.rules
                }
            );
        }
    }, [officeDetails]); // 🔄 Runs only when `officeDetails` changes


    const DaysOpen = () => {

        const weekdayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // Ensure officeDetails, specifications, and availability exist
        const availability = officeDetails?.specifications?.availability;

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
        <Card variant="red" className="pb-3 bg-softRed">
            {
                loading ? (
                    <CardContent className="flex justify-center items-center h-auto">
                        <p className="text-center text-gray-600 text-xl font-semibold pt-6">
                            Loading your office specifications details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader />
                        <CardContent className="space-y-2">

                            <div className="p-4 space-y-3">
                                <p><strong>Office Name:</strong> {officeSpecifications?.officeName || "N/A"}</p>
                                <p><strong>Description:</strong> {officeSpecifications?.description || "N/A"}</p>

                                <DaysOpen />
                            </div>

                        </CardContent>
                        <CardFooter className="">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="yellow" className="w-1/4">Edit</Button>
                                </SheetTrigger>
                                <SheetContent variant="red" className="!w-full max-w-2xl bg-softRed">
                                    <SheetHeader>
                                        <SheetTitle className="flex mb-5">Update Specifications Details</SheetTitle>
                                        <SheetDescription></SheetDescription>
                                    </SheetHeader>

                                    <OfficeSpecificationsForm officeId={officeId} setOfficeSpecifications={setOfficeSpecifications} />

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
