"use client"


import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  // Stubbed data for analytics
  const chartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Views",
        data: [120, 200, 150, 80, 250, 300, 400],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const inquiries = [
    { id: 1, message: "Can I book this space for next week?", date: "2024-11-20" },
    { id: 2, message: "Is parking available?", date: "2024-11-21" },
  ];

  const listings = [
    { id: 1, name: "Modern Office Downtown", views: 320, inquiries: 10 },
    { id: 2, name: "Cozy Coworking Space", views: 200, inquiries: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Business Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Total Listings</h2>
          <p className="text-2xl font-semibold">{listings.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Total Views</h2>
          <p className="text-2xl font-semibold">
            {listings.reduce((sum, listing) => sum + listing.views, 0)}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Total Inquiries</h2>
          <p className="text-2xl font-semibold">
            {listings.reduce((sum, listing) => sum + listing.inquiries, 0)}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Active Listings</h2>
          <p className="text-2xl font-semibold">{listings.length}</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics Overview</h2>
        <Line data={chartData} />
      </div>

      {/* Listings Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{listing.name}</h3>
                <p className="text-gray-600">Views: {listing.views}</p>
                <p className="text-gray-600">Inquiries: {listing.inquiries}</p>
              </div>
              <button className="text-blue-600 hover:underline">Manage</button>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiries Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Inquiries</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {inquiries.length > 0 ? (
            <ul>
              {inquiries.map((inquiry) => (
                <li key={inquiry.id} className="border-b border-gray-200 py-2">
                  <p className="text-gray-800">{inquiry.message}</p>
                  <p className="text-sm text-gray-600">{inquiry.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No inquiries yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
