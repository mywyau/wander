"use client"


import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";

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

  const listings = [
    { id: 1, name: "Modern Office Downtown", views: 320, inquiries: 10 },
    { id: 2, name: "Cozy Coworking Space", views: 200, inquiries: 5 },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-black">Business Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

        <div className="bg-hardPurple shadow-md rounded-lg p-4">
          <h2 className="text-black">
            <strong>
              Total Listings
            </strong>
          </h2>
          <p className="text-2xl font-semibold">{listings.length}</p>
        </div>
        <div className="bg-hardPurple shadow-md rounded-lg p-4">
          <h2 className="text-black">
            <strong>
              Total Views
            </strong>
          </h2>
          <p className="text-2xl font-semibold">
            {listings.reduce((sum, listing) => sum + listing.views, 0)}
          </p>
        </div>
        <div className="bg-hardPurple shadow-md rounded-lg p-4">
          <h2 className="text-black">
            <strong>
              Total Inquiries
            </strong>
          </h2>
          <p className="text-2xl font-semibold">
            {listings.reduce((sum, listing) => sum + listing.inquiries, 0)}
          </p>
        </div>
        <div className="bg-hardPurple shadow-md rounded-lg p-4">
          <h2 className="text-black">
            <strong>
              Active Listings
            </strong>

          </h2>
          <p className="text-2xl font-semibold">{listings.length}</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-black mb-4">Analytics Overview</h2>
        <Line data={chartData} />
      </div>

    </div>
  );
};

export default Dashboard;
