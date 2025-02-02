
import { BusinessListingCard } from "@/types/business/BusinessListing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface BusinessListingsCardsProp {
    filteredBusinesses: BusinessListingCard[];
    currentBusinesses: BusinessListingCard[];
    onDeleteLinkSubmit: (businessId: string) => Promise<void>;
}

const BusinessListCards: React.FC<BusinessListingsCardsProp> = ({
    filteredBusinesses,
    currentBusinesses,
    onDeleteLinkSubmit,
}) => {
    const [showNoBusinesssMessage, setShowNoBusinesssMessage] = useState(false);
    const router = useRouter(); // Get the router instance

    useEffect(() => {
        if (filteredBusinesses.length === 0) {
            const timer = setTimeout(() => {
                setShowNoBusinesssMessage(true);
            }, 1000); // Delay of 1 second
            return () => clearTimeout(timer); // Cleanup timer on component unmount
        } else {
            setShowNoBusinesssMessage(false);
        }
    }, [filteredBusinesses]);


    const handleViewDetails = (businessId: string) => {
        router.push(`/business/detailed-view/${businessId}?timestamp=${Date.now()}`);
    };

    return (
        filteredBusinesses.length === 0 && showNoBusinesssMessage ? (
            <div className="text-center py-8">
                <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">No businesses available or were found</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBusinesses.map(
                    (business) => (

                        <Card className="transition-all bg-hardPurple hover:bg-softPurple">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">{business.businessName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-sm">
                                    {business.description || "No description provided."}
                                </p>

                                <div className="space-x-10">
                                    <Button
                                        variant="yellow"
                                        className="mt-5 hover:bg-softYellow"
                                        onClick={() => handleViewDetails(business.businessId)}
                                    > View listing </Button>
                                    <Button
                                        variant="red"
                                        className="mt-5 hover:bg-softRed"
                                        onClick={() => {
                                            onDeleteLinkSubmit(business.businessId); // Call the delete all action when the user confirms
                                        }}
                                    > Delete </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                )
                }
            </div>
        )
    )
};

export default BusinessListCards;
