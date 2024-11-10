"use client";

import { useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    country: string;
    county: string;
    postcode: string;
  };
  lastLogin: string;
  lastAddressUpdate: string;
  lastPasswordChange: string;
  createdAt: string;

}

const mockUserData: User = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
  phone: '+1234567890',
  company: 'Mikey Corp',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    country: 'United Kingdom',
    county: 'south glamorgan',
    postcode: '12345',
  },
  createdAt: "2022-01-01T10:00:00Z",
  lastLogin: "2023-11-01T10:00:00Z",
  lastAddressUpdate: "2023-10-15T10:00:00Z",
  lastPasswordChange: "2023-09-01T10:00:00Z",
};

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">{title}</h2>
    {children}
  </div>
);

export default function ProfilePage() {

  const handleEditClick = () => {
    setIsEditing(true); // Set editing mode to true
  };  
  
  const handleSaving = () => {
    setIsEditing(false); // Set editing mode to true
  };

  const [userData, setUserData] = useState<User>(mockUserData);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: id.includes("Address") ? { ...prevData.address, [id.split('.')[1]]: value } : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setMessage("Profile updated successfully");
      } else {
        setMessage("Error updating profile");
      }
    } catch (error) {
      setMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex flex-col">
      {/* Main content with two columns */}
      <div className="flex-1 p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: Profile form */}
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileSection title="Profile Picture">
              <div className="flex items-center justify-center">
                <img
                  src="../../../images/pepe_house.jpg"
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full border-2 border-blue-500 mr-4"
                />
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                  Change Picture
                </button>
              </div>
            </ProfileSection>

            {/* Login Details */}
            <ProfileSection title="Login Details">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
            </ProfileSection>

            {/* Details */}
            <ProfileSection title="Details">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  id="company"
                  value={userData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
            </ProfileSection>

            {/* Address */}
            <ProfileSection title="Address">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                <input
                  type="text"
                  id="street"
                  value={userData.address.street}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  value={userData.address.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  id="country"
                  value={userData.address.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">County</label>
                <input
                  type="text"
                  id="county"
                  value={userData.address.county}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                <input
                  type="text"
                  id="postcode"
                  value={userData.address.postcode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={!isEditing}
                />
              </div>
            </ProfileSection>

            {/* Save Changes Button */}
            <div className="col-span-full">
              <button
                type="submit"
                onClick={handleSaving} // Call handleEditClick on click
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="col-span-full">
              <button
                type="submit"
                onClick={handleEditClick} // Call handleEditClick on click
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Editing..." : "Edit"}
              </button>
              {/* Display some editing mode indication */}
              {isEditing && <p>You are now in editing mode.</p>}
            </div>
          </form>

        </div>

        {/* Right section: Additional Content or Widgets */}
        <div className="hidden md:block bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <p className="text-sm">You can add widgets, statistics, quick links, or other content here.</p>
        </div>
      </div>

    </div>
  );
}
