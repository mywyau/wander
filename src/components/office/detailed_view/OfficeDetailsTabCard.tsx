'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from "react";

import OfficeListingConnector from "@/connectors/office/OfficeListingConnector";
import { OfficeListing } from "@/types/office/OfficeListing";
import AddressTabCardWithLoading from "./AddressTabCardWithLoading";
import ContactTabCardWithLoading from './ContactTabCardWithLoading';
import SpecificationsTabCardWithLoading from './SpecificationsTabCardWithLoading';

interface OfficeDetailsTabCardProps {
    businessId: string;
    officeId: string;
}

const OfficeDetailsTabCard: React.FC<OfficeDetailsTabCardProps> = ({ businessId,  officeId }) => {

    const [officeDetails, setOfficeDetails] = useState<OfficeListing | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchOfficeDetails = async () => {
            try {
                setLoading(true);
                const result: OfficeListing = await OfficeListingConnector.getOfficeListing(officeId);
                if (isMounted) {
                    setOfficeDetails(result);
                }
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    setError("Failed to load office details.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchOfficeDetails();

        return () => {
            isMounted = false; // Cleanup function to prevent memory leaks
        };
    }, [officeId]);

    return (
        <Tabs defaultValue="address" className="w-full max-w-7xl">
            <TabsList variant="red" className="grid w-full grid-cols-3 h-18 shadow-light">
                <TabsTrigger value="address" className="text-lg font-semibold data-[state=active]:bg-softRed">Address</TabsTrigger>
                <TabsTrigger value="contact-details" className="text-lg font-semibold data-[state=active]:bg-softRed">Contact Details</TabsTrigger>
                <TabsTrigger value="specifications" className="text-lg font-semibold data-[state=active]:bg-softRed">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="address" className="pt-4">
                <AddressTabCardWithLoading
                    officeId={officeId}
                    officeDetails={officeDetails}
                    loading={loading}
                />
            </TabsContent>

            <TabsContent value="contact-details" className="pt-4">
                <ContactTabCardWithLoading
                    businessId={businessId}
                    officeId={officeId}
                    officeDetails={officeDetails}
                    loading={loading}
                />
            </TabsContent>

            <TabsContent value="specifications" className="pt-4">
                <SpecificationsTabCardWithLoading
                    businessId={businessId}
                    officeId={officeId}
                    officeDetails={officeDetails}
                    loading={loading}
                />
            </TabsContent>
        </Tabs>
    );
};

export default OfficeDetailsTabCard;
