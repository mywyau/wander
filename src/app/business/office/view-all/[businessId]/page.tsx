import OfficeListingController from "@/controllers/office/OfficeListingController";
import ViewAllOfficesPage from "./ViewAllOfficesPage";

interface OfficesViewAllPageProps {
  params: {
    businessId: string;
  };
}

export default async function OfficesViewAllPage({ params }: OfficesViewAllPageProps) {
  const { businessId } = params;

  // Fetch offices data on the server
  const offices = await OfficeListingController.getAllOfficeListingCards(businessId);

  return (
    <ViewAllOfficesPage businessId={businessId} initialOffices={offices} />
  );
}
