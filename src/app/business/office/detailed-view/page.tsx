"use client";

import React from "react";

const OfficeDetailsView = () => {
  // Mock Data
  const officeData = {
    id: "123",
    name: "Phoenix",
    description: "A leading consultancy firm.",
    address: "123 Desk Lane",
    city: "New York",
    postcode: "10001",
    contactEmail: "phoenix@capgemini.com",
    contactPhone: "07402205071",
    numberOfDesks: 10,
    websiteUrl: "bobs_axes.com",
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{officeData.name}</h1>
      <p className="text-gray-600 mb-6">{officeData.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <p>{officeData.address}</p>
          <p>{officeData.city}</p>
          <p>{officeData.postcode}</p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
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
        </div>

        {/* Desks Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Office Details</h2>
          <p>
            <strong>Number of Desks:</strong> {officeData.numberOfDesks}
          </p>
        </div>

        {/* Website Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Website</h2>
          <p>
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
      </div>
    </div>
  );
};

export default OfficeDetailsView;
