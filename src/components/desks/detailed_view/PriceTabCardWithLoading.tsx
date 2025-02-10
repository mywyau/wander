'use client'


// perhaps update this to use websockets instead

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';

import DeskPricingForm from '@/forms/desks/new_forms/DeskPricingForm';
import { DeskListing } from '@/types/desk/DeskListing';
import { UpdateDeskPricing } from '@/types/desk/UpdateDeskPricing';
import { useEffect, useState } from 'react';

interface TabCardWithLoadingProps {
    deskId: string;
    deskDetails?: DeskListing | null;
    loading: boolean;
}

const PricingTabCardWithLoading: React.FC<TabCardWithLoadingProps> = ({ deskId, deskDetails, loading }) => {

    const [deskPricing, setDeskPricing] = useState<UpdateDeskPricing | null>(null);

    //  Use `useEffect` to update state only when `deskDetails` changes
    useEffect(() => {
        if (deskDetails?.pricing) {
            setDeskPricing(
                {
                    pricePerHour: deskDetails?.pricing.pricePerHour || 0,
                    pricePerDay: deskDetails?.pricing.pricePerDay,
                    pricePerWeek: deskDetails?.pricing.pricePerWeek,
                    pricePerMonth: deskDetails?.pricing.pricePerMonth,
                    pricePerYear: deskDetails?.pricing.pricePerYear
                }
            );
        }
    }, [deskDetails]); // 🔄 Runs only when `deskDetails` changes


    return (
        <Card variant="default" className="pb-3 bg-softBlue">
            {
                loading ? (
                    <CardContent className="flex justify-center items-center h-auto">
                        <p className="text-center text-gray-600 text-xl font-semibold pt-6">
                            Loading your desk contactDetails details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader />
                        <CardContent className="space-y-2">

                            <div className="p-4 space-y-3">
                                <p><strong>Price per hour:</strong> {deskPricing?.pricePerHour || ""}</p>
                                <p><strong>Price per day:</strong> {deskPricing?.pricePerDay || ""}</p>
                                <p><strong>Price per week:</strong> {deskPricing?.pricePerWeek || ""}</p>
                                <p><strong>Price per month:</strong> {deskPricing?.pricePerMonth || ""}</p>
                                <p><strong>Price per year:</strong> {deskPricing?.pricePerYear || ""}</p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="yellow" className="w-1/4">Edit</Button>
                                </SheetTrigger>
                                <SheetContent variant="red" className="!w-full max-w-2xl bg-softRed">
                                    <SheetHeader>
                                        <SheetTitle className="flex mb-5">Update Pricing Details</SheetTitle>
                                        <SheetDescription></SheetDescription>
                                    </SheetHeader>

                                    <DeskPricingForm deskId={deskId} setDeskPricing={setDeskPricing} />

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

export default PricingTabCardWithLoading;
