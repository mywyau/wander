import OfficeListingController from "@/controllers/office/OfficeListingController";
import AddNewOfficePage from "./AddNewOffice";

interface OfficesViewAllPageProps {
  params: {
    businessId: string;
  };
}

export default async function OfficesViewAllPage({ params }: OfficesViewAllPageProps) {
  const { businessId } = params;

  // Fetch offices data on the server
  const offices = await OfficeListingController.getAllOfficeListingCards();

  return (
    <AddNewOfficePage businessId={businessId} initialOffices={offices} />
  );
}
