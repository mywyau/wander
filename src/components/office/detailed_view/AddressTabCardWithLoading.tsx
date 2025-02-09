'use client'


// perhaps update this to use websockets instead

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';

// import OfficeAddressForm from '@/forms/office/new_forms/OfficeAddressForm';
import OfficeAddressForm from '@/forms/office/new_forms/OfficeAddressForm';
import { OfficeListing } from "@/types/office/OfficeListing";
import { UpdateOfficeAddressDetails } from '@/types/office/UpdateOfficeAddressDetails';
import { useEffect, useState } from 'react';

interface TabCardWithLoadingProps {
    officeId: string;
    officeDetails?: OfficeListing | null;
    loading: boolean;
}

const AddressTabCardWithLoading: React.FC<TabCardWithLoadingProps> = ({ officeId, officeDetails, loading }) => {

    const [officeAddress, setOfficeAddress] = useState<UpdateOfficeAddressDetails | null>(null);

    useEffect(() => {
        if (officeDetails?.addressDetails) {
            setOfficeAddress(
                {
                    buildingName: officeDetails.addressDetails.buildingName,
                    street: officeDetails.addressDetails.street || "",
                    city: officeDetails.addressDetails.city || "",
                    country: officeDetails.addressDetails.country || "",
                    county: officeDetails.addressDetails.county,
                    postcode: officeDetails.addressDetails.postcode || "",
                }
            );
        }
    }, [officeDetails]);


    return (
        <Card className="pb-3 bg-softBlue">
            {
                loading ? (
                    <CardContent className="flex justify-center items-center h-auto">
                        <p className="text-center text-gray-600 text-xl font-semibold pt-6">
                            Loading your office address details...
                        </p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader />
                        <CardContent className="space-y-2">

                            <div className="p-4 space-y-3">
                                <p><strong>Building Name:</strong> {officeAddress?.buildingName || ""}</p>
                                <p><strong>Street:</strong> {officeAddress?.street || ""}</p>
                                <p><strong>City:</strong> {officeAddress?.city || ""}</p>
                                <p><strong>Country:</strong> {officeAddress?.country || ""}</p>
                                <p><strong>County:</strong> {officeAddress?.county || ""}</p>
                                <p><strong>Postcode:</strong> {officeAddress?.postcode || ""}</p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="yellow" className="w-1/4">Edit</Button>
                                </SheetTrigger>
                                <SheetContent className="!w-full max-w-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="flex mb-5">Update Address Details</SheetTitle>
                                        <SheetDescription></SheetDescription>
                                    </SheetHeader>

                                    <OfficeAddressForm officeId={officeId} setOfficeAddress={setOfficeAddress} />

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
