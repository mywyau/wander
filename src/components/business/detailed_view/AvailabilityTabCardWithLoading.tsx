'use client'

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import BusinessOpeningDaysForm from '@/forms/business/BusinessOpeningDaysForm';
import BusinessOpeningHoursForm from '@/forms/business/BusinessOpeningHoursForm';
import { BusinessListing } from '@/types/business/BusinessListing';
import { OpeningHours } from '@/types/OpeningHours';

import { useState } from 'react';

interface AvailabilityTabCardWithLoadingProps {
    businessId: string;
    businessDetails?: BusinessListing | null;
    loading: boolean;
}

const AvailabilityTabCardWithLoading: React.FC<AvailabilityTabCardWithLoadingProps> = ({ businessId, businessDetails, loading }) => {

    const [businessOpeningHours, setBusinessOpeningHours] = useState<OpeningHours | null>(null);

    //  Use `useEffect` to update state only when `businessDetails` changes
    // useEffect(() => {
    //     if (businessDetails?.specifications) {
    //         setBusinessOpeningHours(
    //             {
    //                 day: businessDetails.specifications.openingHours?.day,
    //                 openingTime: businessDetails.specifications.openingHours?.openingTime,
    //                 closingTime: businessDetails.specifications.openingHours?.closingTime
    //             }
    //         );
    //     }
    // }, [businessDetails]); // 🔄 Runs only when `businessDetails` changes


    const DaysOpen = () => {

        const weekdayOrder: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const openingHours = businessDetails?.specifications?.openingHours;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weekdayOrder.map((day) => (
                    <Card key={day} className="border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-softRed">
                        <CardHeader>
                            <CardTitle className="text-black font-bold">{day}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-black">
                            <p><strong>Opening Time:</strong> {openingHours?.openingTime.hour || "Not Set"}</p>
                            <p><strong>Closing Time:</strong> {openingHours?.closingTime.hour || "Not Set"}</p>

                            <div className="pt-4">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="purple" className="w-full">Edit Opening Hours</Button>
                                    </SheetTrigger>
                                    <SheetContent variant={"red"} className="!w-full max-w-2xl">
                                        <SheetHeader>
                                            <SheetTitle className="flex mb-5">Update Your Business' Opening Hours</SheetTitle>
                                            <SheetDescription></SheetDescription>
                                        </SheetHeader>

                                        <BusinessOpeningHoursForm businessId={businessId} setBusinessOpeningHours={setBusinessOpeningHours} />

                                        <SheetFooter>
                                            <SheetClose asChild></SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>

                        </CardContent>
                    </Card>
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
                            Loading your business openingHours details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader>

                            <div className="p-4 pb-1">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="green" className="w-1/4">Select Days Open</Button>
                                    </SheetTrigger>
                                    <SheetContent className="!w-full max-w-2xl">
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
                        <CardFooter className="">

                        </CardFooter>
                    </>
                )
            }
        </Card >
    );
};

export default AvailabilityTabCardWithLoading;
