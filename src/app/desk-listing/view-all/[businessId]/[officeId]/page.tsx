import DeskListingController from "@/controllers/desk/DeskListingController";
import ViewAllDesksPage from "./ViewAllDesksPage";

interface DesksViewAllPageProps {
  params: {
     officeId: string,
     businessId: string
   };
}

export default async function DesksViewAllPage({ params }: DesksViewAllPageProps) {
  // Ensure params is awaited before accessing properties
  const officeId = params?.officeId;
  const businessId = params?.businessId;

  if (!officeId) {
    throw new Error("officeId is required for this page.");
  }

  // Fetch offices data on the server
  const offices = await DeskListingController.getAllDeskListingCards(officeId);

  return <ViewAllDesksPage  businessId={businessId} officeId={officeId} initialDesks={offices} />;
}
