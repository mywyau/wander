'use client'


// perhaps update this to use websockets instead

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';

import BusinessContactDetailsForm from '@/forms/business/BusinessContactDetailsForm';
import { BusinessContactDetails, BusinessListing } from "@/types/business/BusinessListing";
import { useEffect, useState } from 'react';

interface TabCardWithLoadingProps {
    businessId: string;
    businessDetails?: BusinessListing | null;
    loading: boolean;
}

const TabCardWithLoading: React.FC<TabCardWithLoadingProps> = ({ businessId, businessDetails, loading }) => {

    const [businessContactDetails, setBusinessContactDetails] = useState<BusinessContactDetails | null>(null);

    //  Use `useEffect` to update state only when `businessDetails` changes
    useEffect(() => {
        if (businessDetails?.contactDetails) {
            setBusinessContactDetails(
                {
                    businessId: businessId,
                    primaryContactFirstName: businessDetails.contactDetails.primaryContactFirstName,
                    primaryContactLastName: businessDetails.contactDetails.primaryContactLastName,
                    contactEmail: businessDetails.contactDetails.contactEmail,
                    contactNumber: businessDetails.contactDetails.contactNumber,
                    websiteUrl: businessDetails.contactDetails.websiteUrl,
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
                            Loading your business contactDetails details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader />
                        <CardContent className="space-y-2">

                            <div className="p-4 space-y-3">
                                <p><strong>First Name:</strong> {businessContactDetails?.primaryContactFirstName || ""}</p>
                                <p><strong>Last Name:</strong> {businessContactDetails?.primaryContactLastName || ""}</p>
                                <p><strong>Email:</strong> {businessContactDetails?.contactEmail || ""}</p>
                                <p><strong>Contact Number:</strong> {businessContactDetails?.contactNumber || ""}</p>
                                <p><strong>WebsiteUrl:</strong> {businessContactDetails?.websiteUrl || ""}</p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="yellow" className="w-1/4">Edit</Button>
                                </SheetTrigger>
                                <SheetContent variant="purple" className="!w-full max-w-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="flex mb-5">Update ContactDetails Details</SheetTitle>
                                        <SheetDescription></SheetDescription>
                                    </SheetHeader>

                                    <BusinessContactDetailsForm businessId={businessId} setBusinessContactDetails={setBusinessContactDetails} />

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
