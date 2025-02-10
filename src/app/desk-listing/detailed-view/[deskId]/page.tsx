// import DeskDetailsTabCard from '@/components/desk/detailed_view/DeskDetailsTabCard';
import DeskDetailsTabCard from '@/components/desks/detailed_view/DeskDetailsTabCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface DeskDetailedViewProps {
  params: {
    businessId: string;
    officeId: string;
    deskId: string;
  };
}

export default async function DeskDetailedView({ params }: DeskDetailedViewProps) {

  const { businessId, officeId, deskId } = params;

  return (
    <div className="min-h-screen flex flex-col items-center p-6">

      {/* Container for structured layout */}
      <div className="w-full max-w-5xl">

        {/* Breadcrumbs with spacing below */}
        <div className="w-full rounded-lg  mb-6">
          <Breadcrumb>
            <BreadcrumbList>

              <BreadcrumbItem>
                <BreadcrumbLink href={`/wander/business/view-all`} className="hover:text-blue-800">
                  View all business
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/wander/office/view-all/${businessId}?timestamp=${Date.now()}`}
                  className="hover:text-blue-800"
                >
                  View all offices for business
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/wander/desk-listing/view-all/${businessId}/${officeId}?timestamp=${Date.now()}`}
                  className="hover:text-blue-800"
                >
                  View all desks for office
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/wander/desk-listing/detailed-view/${deskId}?timestamp=${Date.now()}`}
                  className="hover:text-blue-800"
                >
                  Desk details
                </BreadcrumbLink>
              </BreadcrumbItem>

            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Desk Details Tab Card with spacing on top */}
        <div className="w-full flex justify-center mt-6">
          <DeskDetailsTabCard deskId={deskId} />
        </div>

      </div>

    </div>
  );
}
