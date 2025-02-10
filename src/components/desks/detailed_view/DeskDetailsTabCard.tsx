'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from "react";

import DeskListingConnector from "@/connectors/desk/DeskListingConnector";
import { DeskListing } from "@/types/desk/DeskListing";
import PricingTabCardWithLoading from './PriceTabCardWithLoading';
import SpecificationsTabCardWithLoading from './SpecificationsTabCardWithLoading';

interface DeskDetailsTabCardProps {
    deskId: string;
}

const DeskDetailsTabCard: React.FC<DeskDetailsTabCardProps> = ({ deskId }) => {

    const [deskDetails, setDeskDetails] = useState<DeskListing | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchDeskDetails = async () => {
            try {
                setLoading(true);
                const result: DeskListing = await DeskListingConnector.getDeskListing(deskId);
                if (isMounted) {
                    setDeskDetails(result);
                }
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    setError("Failed to load desk details.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchDeskDetails();

        return () => {
            isMounted = false; // Cleanup function to prevent memory leaks
        };
    }, [deskId]);

    return (
        <Tabs defaultValue="pricing" className="w-full max-w-7xl">
            <TabsList variant="default" className="grid w-full grid-cols-2 h-18 shadow-light">
                <TabsTrigger value="pricing" className="text-lg font-semibold data-[state=active]:bg-bg">Pricing</TabsTrigger>
                <TabsTrigger value="specifications" className="text-lg font-semibold data-[state=active]:bg-bg">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="pricing" className="pt-4">
                <PricingTabCardWithLoading
                    deskId={deskId}
                    deskDetails={deskDetails}
                    loading={loading}
                />
            </TabsContent>

            <TabsContent value="specifications" className="pt-4">
                <SpecificationsTabCardWithLoading
                    deskId={deskId}
                    deskDetails={deskDetails}
                    loading={loading}
                />
            </TabsContent>
        </Tabs>
    );
};

export default DeskDetailsTabCard;
