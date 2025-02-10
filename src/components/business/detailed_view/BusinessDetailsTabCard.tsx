'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from "react";

import BusinessListingConnector from "@/connectors/business/BusinessListingConnector";
import { BusinessListing } from "@/types/business/BusinessListing";
import AddressTabCardWithLoading from "./AddressTabCardWithLoading";
import ContactTabCardWithLoading from './ContactTabCardWithLoading';
import SpecificationsTabCardWithLoading from './SpecificationsTabCardWithLoading';

interface BusinessDetailsTabCardProps {
    businessId: string;
}

const BusinessDetailsTabCard: React.FC<BusinessDetailsTabCardProps> = ({ businessId }) => {

    const [businessDetails, setBusinessDetails] = useState<BusinessListing | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchBusinessDetails = async () => {
            try {
                setLoading(true);
                const result: BusinessListing = await BusinessListingConnector.getBusinessListing(businessId);
                if (isMounted) {
                    setBusinessDetails(result);
                }
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    setError("Failed to load business details.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchBusinessDetails();

        return () => {
            isMounted = false; // Cleanup function to prevent memory leaks
        };
    }, [businessId]);

    return (
        <Tabs defaultValue="address" className="w-full max-w-7xl">
            <TabsList className="grid w-full grid-cols-3 h-18 shadow-light">
                <TabsTrigger value="address" className="text-lg font-semibold data-[state=active]:bg-softBlue">Address</TabsTrigger>
                <TabsTrigger value="contact-details" className="text-lg font-semibold data-[state=active]:bg-softBlue">Contact Details</TabsTrigger>
                <TabsTrigger value="specifications" className="text-lg font-semibold data-[state=active]:bg-softBlue">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="address" className="pt-4">
                <AddressTabCardWithLoading
                    businessId={businessId}
                    businessDetails={businessDetails}
                    loading={loading}
                />
            </TabsContent>

            <TabsContent value="contact-details" className="pt-4">
                <ContactTabCardWithLoading
                    businessId={businessId}
                    businessDetails={businessDetails}
                    loading={loading}
                />
            </TabsContent>

            <TabsContent value="specifications" className="pt-4">
                <SpecificationsTabCardWithLoading
                    businessId={businessId}
                    businessDetails={businessDetails}
                    loading={loading}
                />
            </TabsContent>
        </Tabs>
    );
};

export default BusinessDetailsTabCard;
