'use client'


// perhaps update this to use websockets instead

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';

import { OfficeContactDetails, OfficeListing } from "@/types/office/OfficeListing";
import { useEffect, useState } from 'react';
import OfficeContactDetailsForm from '@/forms/office/new_forms/OfficeContactDetailsForm';

interface TabCardWithLoadingProps {
    businessId: string;
    officeId: string;
    officeDetails?: OfficeListing | null;
    loading: boolean;
}

const TabCardWithLoading: React.FC<TabCardWithLoadingProps> = ({ businessId, officeId, officeDetails, loading }) => {

    const [officeContactDetails, setOfficeContactDetails] = useState<OfficeContactDetails | null>(null);

    //  Use `useEffect` to update state only when `officeDetails` changes
    useEffect(() => {
        if (officeDetails?.contactDetails) {
            setOfficeContactDetails(
                {
                    businessId: businessId,
                    officeId: officeId,
                    primaryContactFirstName: officeDetails.contactDetails.primaryContactFirstName,
                    primaryContactLastName: officeDetails.contactDetails.primaryContactLastName,
                    contactEmail: officeDetails.contactDetails.contactEmail,
                    contactNumber: officeDetails.contactDetails.contactNumber,
                }
            );
        }
    }, [officeDetails]); // 🔄 Runs only when `officeDetails` changes


    return (
        <Card className="pb-3 bg-softBlue">
            {
                loading ? (
                    <CardContent className="flex justify-center items-center h-auto">
                        <p className="text-center text-gray-600 text-xl font-semibold pt-6">
                            Loading your office contactDetails details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader />
                        <CardContent className="space-y-2">

                            <div className="p-4 space-y-3">
                                <p><strong>First Name:</strong> {officeContactDetails?.primaryContactFirstName || ""}</p>
                                <p><strong>Last Name:</strong> {officeContactDetails?.primaryContactLastName || ""}</p>
                                <p><strong>Email:</strong> {officeContactDetails?.contactEmail || ""}</p>
                                <p><strong>Contact Number:</strong> {officeContactDetails?.contactNumber || ""}</p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="yellow" className="w-1/4">Edit</Button>
                                </SheetTrigger>
                                <SheetContent className="!w-full max-w-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="flex mb-5">Update ContactDetails Details</SheetTitle>
                                        <SheetDescription></SheetDescription>
                                    </SheetHeader>

                                    <OfficeContactDetailsForm officeId={officeId} setOfficeContactDetails={setOfficeContactDetails} />

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
