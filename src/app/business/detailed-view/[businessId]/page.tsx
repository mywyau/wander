
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

  // if (!params?.businessId) {
  //   return <p>Loading...</p>; // Placeholder while data loads
  // }

  const { businessId } = params;

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
        <BusinessDetailsTabCard businessId={businessId} />
      </div >
      
    </div >
  );
}
