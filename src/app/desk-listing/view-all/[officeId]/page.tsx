import DeskListingController from "@/controllers/desk/DeskListingController";
import ViewAllDesksPage from "./ViewAllDesksPage";

interface DesksViewAllPageProps {
  params: { officeId: string };
}

export default async function DesksViewAllPage({ params }: DesksViewAllPageProps) {
  // Ensure params is awaited before accessing properties
  const officeId = params?.officeId;

  if (!officeId) {
    throw new Error("officeId is required for this page.");
  }

  // Fetch offices data on the server
  const offices = await DeskListingController.getAllDeskListingCards(officeId);

  return <ViewAllDesksPage officeId={officeId} initialDesks={offices} />;
}
