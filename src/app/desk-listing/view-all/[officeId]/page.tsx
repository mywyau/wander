import DeskListingController from "@/controllers/desk/DeskListingController";
import ViewAllDesksPage from "./ViewAllDesksPage";

interface DesksViewAllPageProps {
  params: {
    officeId: string;
  };
}

export default async function DesksViewAllPage({ params }: DesksViewAllPageProps) {
  const { officeId } = params;

  // Fetch offices data on the server
  const offices = await DeskListingController.getAllDeskListingCards(officeId);

  return (
    <ViewAllDesksPage officeId={officeId} initialDesks={offices} />
  );
}
