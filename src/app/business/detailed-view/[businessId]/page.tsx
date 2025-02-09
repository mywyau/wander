import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

import BusinessDetailsTabCard from "@/components/business/detailed_view/BusinessDetailsTabCard";
import { Checkbox } from '@/components/ui/checkbox';

interface BusinessDetailedViewProps {
  params: {
    businessId: string;
  };
}

export default async function BusinessDetailedView({ params }: BusinessDetailedViewProps) {
  const { businessId } = params;

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      
      {/* Container for structured layout */}
      <div className="w-full max-w-5xl"> 
        
        {/* Breadcrumbs with spacing below */}
        <div className="w-full rounded-lg  mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/wander/business/view-all" className="hover:text-blue-800">
                  View all businesses
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href={`/wander/business/detailed-view/${businessId}?timestamp=${Date.now()}`} 
                  className="hover:text-blue-800"
                >
                  Business details
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Business Details Tab Card with spacing on top */}
        <div className="w-full flex justify-center mt-6">
          <BusinessDetailsTabCard businessId={businessId} />
        </div>

      </div>
      
    </div>
  );
}
