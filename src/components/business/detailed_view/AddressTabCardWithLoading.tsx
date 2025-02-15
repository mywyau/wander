'use client'


// perhaps update this to use websockets instead

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';

import BusinessAddressForm from '@/forms/business/BusinessAddressForm';
import { BusinessAddressDetails, BusinessListing } from "@/types/business/BusinessListing";
import { useEffect, useState } from 'react';

interface TabCardWithLoadingProps {
    businessId: string;
    businessDetails?: BusinessListing | null;
    loading: boolean;
}

const AddressTabCardWithLoading: React.FC<TabCardWithLoadingProps> = ({ businessId, businessDetails, loading }) => {

    const [businessAddress, setBusinessAddress] = useState<BusinessAddressDetails | null>(null);

    //  Use `useEffect` to update state only when `businessDetails` changes
    useEffect(() => {
        if (businessDetails?.addressDetails) {
            setBusinessAddress(
                {
                    businessId: businessId,
                    buildingName: businessDetails.addressDetails.buildingName,
                    street: businessDetails.addressDetails.street,
                    city: businessDetails.addressDetails.city,
                    country: businessDetails.addressDetails.country,
                    county: businessDetails.addressDetails.county,
                    postcode: businessDetails.addressDetails.postcode,
                }
            );
        }
    }, [businessDetails]); // 🔄 Runs only when `businessDetails` changes


    return (
        <Card variant="purple" className="pb-3 bg-softPurple">
            {
                loading ? (
                    <CardContent className="flex justify-center items-center h-auto">
                        <p className="text-center text-gray-600 text-xl font-semibold pt-6">
                            Loading your business address details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader />
                        <CardContent className="space-y-2">

                            <div className="p-4 space-y-3">
                                <p><strong>Building Name:</strong> {businessAddress?.buildingName || ""}</p>
                                <p><strong>Street:</strong> {businessAddress?.street || ""}</p>
                                <p><strong>City:</strong> {businessAddress?.city || ""}</p>
                                <p><strong>Country:</strong> {businessAddress?.country || ""}</p>
                                <p><strong>County:</strong> {businessAddress?.county || ""}</p>
                                <p><strong>Postcode:</strong> {businessAddress?.postcode || ""}</p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="yellow" className="w-1/4">Edit</Button>
                                </SheetTrigger>
                                <SheetContent variant="purple" className="!w-full max-w-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="flex mb-5">Update Address Details</SheetTitle>
                                        <SheetDescription></SheetDescription>
                                    </SheetHeader>

                                    <BusinessAddressForm businessId={businessId} setBusinessAddress={setBusinessAddress} />

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

export default AddressTabCardWithLoading;
