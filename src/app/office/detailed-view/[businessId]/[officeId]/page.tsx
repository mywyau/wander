import OfficeDetailsTabCard from '@/components/office/detailed_view/OfficeDetailsTabCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface OfficeDetailedViewProps {
  params: {
    businessId: string;
    officeId: string;
  };
}

export default async function OfficeDetailedView({ params }: OfficeDetailedViewProps) {

  const { businessId, officeId } = params;

  return (
    <div className="min-h-screen flex flex-col items-center p-6">

      {/* Container for structured layout */}
      <div className="w-full max-w-5xl">

        {/* Breadcrumbs with spacing below */}
        <div className="w-full rounded-lg  mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/wander/office/view-all/${businessId}?timestamp=${Date.now()}`} className="hover:text-blue-800">
                  View all offices
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/wander/office/detailed-view/${officeId}?timestamp=${Date.now()}`}
                  className="hover:text-blue-800"
                >
                  Office details
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Office Details Tab Card with spacing on top */}
        <div className="w-full flex justify-center mt-6">
          <OfficeDetailsTabCard businessId={businessId} officeId={officeId} />
        </div>

      </div>

    </div>
  );
}
