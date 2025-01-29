import DeskListingController from "@/controllers/desk/DeskListingController";
import DeskDetailedViewSidebar from "@/components/sidebar/DeskDetailedViewSidebar";
import Navbar from "@/components/navbar/NavBar";
import { DeskListingBusinessAndOffice } from "@/types/desk/DeskListingBusinessAndOffice";

interface DeskViewAllLayoutProps {
  children: React.ReactNode;
  params: { deskId: string };
}

const DeskViewAllLayout = async ({ children, params }: DeskViewAllLayoutProps) => {
  const { deskId } = params;

  let businessAndOfficeId: DeskListingBusinessAndOffice | null = null;

  try {
    businessAndOfficeId = await DeskListingController.getBusinessAndOfficeId(deskId);
  } catch (error) {
    console.error("Failed to fetch business and office ID:", error);
    // Optionally handle errors gracefully here (e.g., return a custom error message or log)
  }

  if (!businessAndOfficeId) {
    return <p className="text-center mt-4 text-red-500">Unable to load desk details. Please try again later.</p>;
  }

  return (
    <div className="antialiased bg-gray-50 text-gray-900">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <DeskDetailedViewSidebar isOpen={true} businessId={businessAndOfficeId.businessId} officeId={businessAndOfficeId.officeId} />
          <main className="flex-1 container mx-auto p-4 mt-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DeskViewAllLayout;
