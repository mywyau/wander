"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import the useSession hook for accessing session data

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

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">{title}</h2>
    {children}
  </div>
);

export default function ProfilePage() {
  const { data: session, status } = useSession(); // Access the session and its status
  const [userData, setUserData] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile data using userId from the session
  useEffect(() => {
    if (status === "authenticated" && session?.user?.userId) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/wanderer/user/profile/${session.user.userId}`);
          if (res.ok) {
            const data: User = await res.json();
            setUserData(data); // Populate form with fetched user data
          } else {
            setMessage("Failed to fetch user data.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setMessage("An error occurred while fetching user data.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [session, status]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) =>
      prevData
        ? {
            ...prevData,
            [id]: id.includes("Address") ? { ...prevData.address, [id.split(".")[1]]: value } : value,
          }
        : null
    );
  };

  // Handle form submission for updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!session?.user?.userId) {
      setMessage("User ID is missing from the session.");
      return;
    }

    try {
      const res = await fetch(`/api/wanderer/user/profile/${session.user.userId}`, {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setMessage("Profile updated successfully.");
        const updatedUser: User = await res.json();
        setUserData(updatedUser); // Update state with the latest data
        setIsEditing(false); // Exit editing mode
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (!session || !session.user || status === "unauthenticated") {
    return <p>Please log in to view your profile.</p>;
  }

  if (isLoading && !userData) {
    return <p>Loading profile...</p>;
  }

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileSection title="Login Details">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
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

            {/* Add other sections like Details and Address here similarly */}

            <div className="col-span-full">
              <button
                type="submit"
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading || !isEditing}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="col-span-full">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)} // Toggle editing mode
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
              >
                {isEditing ? "Cancel Editing" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
