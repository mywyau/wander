"use client";

import Link from "next/link";

const OfficeDetailsView = () => {
  // Mock Data
  const officeData = {
    id: "123",
    name: "Phoenix",
    description: "A \"leading\" consultancy firm who does not underpay their staff whatsoever no siree.",
    street: "123 Desk Lane",
    city: "New York",
    postcode: "10001",
    contactEmail: "phoenix@capgemini.com",
    contactPhone: "07402205071",
    typeofOffice: "Private Office",
    numberOfDesks: 10,
    numberOfFloors: 5,
    totalDesks: 500,
    capacity: 1000,
    amenities: ["Wifi", "Toilets", "Coffee", "Meeting Rooms"],
    availability: {
      days: ["Monday", "Thursday"],
      startTime: "09:00",
      endTime: "17:00",
    },
    websiteUrl: "bobs_axes.com",
    rules: "No smoking",
    createdAt: new Date().toISOString().slice(0, 19),
    updatedAt: new Date().toISOString().slice(0, 19),

  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{officeData.name}</h1>
      <p className="text-gray-600 mb-6">{officeData.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Address Section */}
        <div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold mb-2 underline">Address</h2>
            <p><strong>Street:</strong> {officeData.street}</p>
            <p><strong>City:</strong> {officeData.city}</p>
            <p><strong>Postcode:</strong> {officeData.postcode}</p>
          </div>
          <div className="mt-4 flex gap-6">
            <Link
              href={`/business/office/address/edit`}
              className="text-base text-blue-600 rounded hover:text-blue-800 underline"
            >
              Edit Address Details
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold mb-2 underline">Contact Information</h2>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${officeData.contactEmail}`}
                className="text-blue-500 hover:underline"
              >
                {officeData.contactEmail}
              </a>
            </p>
            <p>
              <strong>Phone:</strong> {officeData.contactPhone}
            </p>

            <p>
              <strong>Website Address:</strong>
              <a
                href={`https://${officeData.websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {officeData.websiteUrl}
              </a>
            </p>
          </div>
          <div className="mt-4 flex gap-6">
            <Link
              href={`/business/office/contact/details/edit`}
              className="text-base text-blue-600 rounded hover:text-blue-800 underline"
            >
              Edit Contact Details
            </Link>
          </div>
        </div>

        {/* Desks Section */}
        <div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold mb-2 underline">Office Details</h2>
            <p>
              <strong>Number of Desks:</strong> {officeData.numberOfDesks}
            </p>
            <p>
              <strong>Amentities:</strong> {officeData.amenities.map(day => day + " ")}
            </p>
            <p>
              <strong>Office Type:</strong> {officeData.typeofOffice}
            </p>
            <p>
              <strong>Floors:</strong> {officeData.numberOfFloors}
            </p>
            <p>
              <strong>Total capacity:</strong> {officeData.capacity}
            </p>
            <p>
              <strong>Days Open:</strong> {officeData.availability.days.map(day => day + " ")}
            </p>
            <p>
              <strong>Opening Time:</strong> {officeData.availability.startTime}
            </p>
            <p>
              <strong>Closing Time:</strong> {officeData.availability.endTime}
            </p>
          </div>
          <div className="mt-4 flex gap-6">
            <Link
              href={`/business/office/specifications/edit`}
              className="text-base text-blue-600 rounded hover:text-blue-800 underline"
            >
              Edit Office Specifications
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default OfficeDetailsView;
