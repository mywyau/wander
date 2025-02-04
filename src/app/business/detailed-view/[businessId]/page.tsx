
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

import BusinessDetailsTabCard from "@/components/business/detailed_view/BusinessDetailsTabCard";

interface BusinessDetailedViewProps {
  params: {
    businessId: string;
  };
}

export default async function BusinessDetailedView(
  { params }: BusinessDetailedViewProps
) {

  const { businessId } = params;

  // try {
  // Fetch business details server-side
  // const business: BusinessListing = await BusinessListingController.getBusinessListing(businessId);
  // console.log("[BusinessDetailedView] Fetched business details:", business);


  // const { addressDetails, contactDetails, specifications } = business;

  return (
    <div>

      <div className="w-full flex rounded-lg mt-20">
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
                Business details
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex justify-center mt-10">

        <BusinessDetailsTabCard />
      </div >
    </div >
  );
}
