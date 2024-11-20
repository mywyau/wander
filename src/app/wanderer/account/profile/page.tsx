"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  UserLoginDetails,
  UserPersonalDetails,
  UserAddress,
  UpdatedUserRequest,
} from "@/types/user";


const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">{title}</h2>
    {children}
  </div>
);

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    if (status === "authenticated" && session?.user?.userId) {
      const fetchUserData = async () => {
        setIsLoading(true);
        console.log("Fetching user data..."); // Log request initiation
        try {
          const res = await fetch(`http://localhost:8080/cashew/wanderer/user/profile/${session.user.userId}`);
          console.log("Fetch response status:", res.status); // Log response status

          if (res.ok) {
            const data: User = await res.json();
            console.log("Fetched user data:", data); // Log fetched data
            setUserData(data);
          } else {
            setMessage("Failed to fetch user data.");
            console.error("Failed to fetch user data, response:", res);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserData((prevData) =>
      prevData
        ? {
            ...prevData,
            userLoginDetails: id.startsWith("login.")
              ? { ...prevData.userLoginDetails, [id.split(".")[1]]: value }
              : prevData.userLoginDetails,
            userPersonalDetails: id.startsWith("personal.")
              ? { ...prevData.userPersonalDetails, [id.split(".")[1]]: value }
              : prevData.userPersonalDetails,
            userAddress: id.startsWith("address.")
              ? { ...prevData.userAddress, [id.split(".")[1]]: value }
              : prevData.userAddress,
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (!session?.user?.userId || !userData) {
      setMessage("User ID or data is missing.");
      console.error("Cannot submit: User ID or data is missing.");
      return;
    }
  
    // Construct the UpdatedUserRequest payload
    const updatedUserRequest: UpdatedUserRequest = {
      loginDetails: {
        ...userData.userLoginDetails,
      },
      address: {
        ...userData.userAddress,
      },
      personalDetails: {
        ...userData.userPersonalDetails,
      }
    };
  
    // Remove `null`, `undefined`, or empty string fields
    const cleanRequest = JSON.parse(JSON.stringify(updatedUserRequest, (key, value) => {
      return value === null || value === undefined || value === "" ? undefined : value;
    }));
  
    console.log("Cleaned UpdatedUserRequest payload:", cleanRequest); // Log cleaned payload
  
    try {
      const res = await fetch(`http://localhost:8080/cashew/wanderer/user/profile/${session.user.userId}`, {
        method: "PUT",
        body: JSON.stringify(cleanRequest),
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Submit response status:", res.status); // Log response status
  
      if (res.ok) {
        const updatedData: User = await res.json();
        console.log("Updated user data:", updatedData); // Log updated user data
        setUserData(updatedData);
        setMessage("Profile updated successfully.");
        setIsEditing(false);
      } else {
        setMessage("Failed to update profile.");
        console.error("Failed to update profile, response:", res);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };
  

  if (status === "loading") return <p>Loading session...</p>;
  if (!session || !session.user || status === "unauthenticated") return <p>Please log in to view your profile.</p>;
  if (isLoading && !userData) return <p>Loading profile...</p>;
  if (!userData) return <p>No user data available.</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <ProfileSection title="Login Details">
              <div>
                <label htmlFor="login.username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="login.username"
                  value={userData.userLoginDetails.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="login.email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="login.email"
                  value={userData.userLoginDetails.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
            </ProfileSection>

            <ProfileSection title="Personal Details">
              <div>
                <label htmlFor="personal.firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="personal.firstName"
                  value={userData.userPersonalDetails.firstName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="personal.lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="personal.lastName"
                  value={userData.userPersonalDetails.lastName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="personal.contactNumber" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  id="personal.contactNumber"
                  value={userData.userPersonalDetails.contactNumber || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="personal.email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="text"
                  id="personal.email"
                  value={userData.userPersonalDetails.email || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="personal.company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  id="personal.company"
                  value={userData.userPersonalDetails.company || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>

              {/* Add more fields for personal details */}
            </ProfileSection>

            <ProfileSection title="Address">
              <div>
                <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                <input
                  type="text"
                  id="address.street"
                  value={userData.userAddress.street || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  id="address.city"
                  value={userData.userAddress.city || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  id="address.country"
                  value={userData.userAddress.country || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="address.county" className="block text-sm font-medium text-gray-700 mb-1">County</label>
                <input
                  type="text"
                  id="address.county"
                  value={userData.userAddress.county || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label htmlFor="address.postcode" className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                <input
                  type="text"
                  id="address.postcode"
                  value={userData.userAddress.postcode || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>
              
              {/* Add more fields for address */}
            </ProfileSection>
            

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
                onClick={() => setIsEditing(!isEditing)}
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
