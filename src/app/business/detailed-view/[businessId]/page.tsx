
// 'use client'

import { notFound } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';




import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BusinessDetailedViewProps {
  params: {
    businessId: string;
  };
}

export default async function BusinessDetailedView(
  { params }: BusinessDetailedViewProps
) {
  // console.log("BusinessDetailedView params:", params);

  const { businessId } = params;

  try {
    // Fetch business details server-side
    // const business: BusinessListing = await BusinessListingController.getBusinessListing(businessId);
    // console.log("[BusinessDetailedView] Fetched business details:", business);


    // const { addressDetails, contactDetails, specifications } = business;

    return (
      <div>

        <div className="">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/wander/business/view-all" className="hover:text-blue-800">
                  View all businesses
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/wander/business/detailed-view/${businessId}?timestamp=${Date.now()}`} className="hover:text-blue-800">
                  Business detailed view
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="w-full flex justify-center mt-20">

          <Tabs defaultValue="address" className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-3 h-18 shadow-light">
              <TabsTrigger value="address" className="text-lg font-semibold data-[state=active]:bg-softBlue">Address</TabsTrigger>
              <TabsTrigger value="contact-details" className="text-lg font-semibold data-[state=active]:bg-softBlue">Contact Details</TabsTrigger>
              <TabsTrigger value="specifications" className="text-lg font-semibold data-[state=active]:bg-softBlue">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="address" className="pt-3">
              <Card className="pb-3 bg-softBlue">
                <CardHeader>
                  {/* <CardTitle>Address</CardTitle> */}
                  {/* <CardDescription>
                  Enter your email and password to login.
                </CardDescription> */}
                </CardHeader>
                <CardContent className="space-y-2">
                  
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="contact-details" className="pt-3">
              <Card className="pb-3 bg-softBlue">
                <CardHeader>
                  <CardTitle></CardTitle>


                </CardHeader>
                <CardContent className="space-y-2">

                </CardContent>

                <CardFooter>
                </CardFooter>

              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="pt-3">
              <Card className="pb-3 bg-softBlue">
                <CardHeader>
                  <CardTitle></CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">


                </CardContent>
                <CardFooter>

                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div >
      </div >
    );
  } catch (error) {
    console.error("[BusinessDetailedView] Error fetching business details:", error);
    notFound();
  }
}
