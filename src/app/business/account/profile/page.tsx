"use client";

import {
  UpdatedUserRequest,
  User
} from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


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
                <select
                  id="address.city"
                  value={userData.userAddress.city || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                >
                  <option value="" disabled>Select a city</option>
                  <option value="Aberdeen">Aberdeen</option>
                  <option value="Armagh">Armagh</option>
                  <option value="Bangor">Bangor</option>
                  <option value="Bath">Bath</option>
                  <option value="Belfast">Belfast</option>
                  <option value="Birmingham">Birmingham</option>
                  <option value="Bradford">Bradford</option>
                  <option value="Brighton and Hove">Brighton and Hove</option>
                  <option value="Bristol">Bristol</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Canterbury">Canterbury</option>
                  <option value="Cardiff">Cardiff</option>
                  <option value="Carlisle">Carlisle</option>
                  <option value="Chelmsford">Chelmsford</option>
                  <option value="Chester">Chester</option>
                  <option value="Chichester">Chichester</option>
                  <option value="Coventry">Coventry</option>
                  <option value="Derby">Derby</option>
                  <option value="Derry">Derry</option>
                  <option value="Dundee">Dundee</option>
                  <option value="Durham">Durham</option>
                  <option value="Edinburgh">Edinburgh</option>
                  <option value="Ely">Ely</option>
                  <option value="Exeter">Exeter</option>
                  <option value="Glasgow">Glasgow</option>
                  <option value="Gloucester">Gloucester</option>
                  <option value="Hereford">Hereford</option>
                  <option value="Inverness">Inverness</option>
                  <option value="Kingston upon Hull">Kingston upon Hull</option>
                  <option value="Lancaster">Lancaster</option>
                  <option value="Leeds">Leeds</option>
                  <option value="Leicester">Leicester</option>
                  <option value="Lichfield">Lichfield</option>
                  <option value="Lincoln">Lincoln</option>
                  <option value="Lisburn">Lisburn</option>
                  <option value="Liverpool">Liverpool</option>
                  <option value="London">London</option>
                  <option value="Manchester">Manchester</option>
                  <option value="Newcastle upon Tyne">Newcastle upon Tyne</option>
                  <option value="Newport">Newport</option>
                  <option value="Norwich">Norwich</option>
                  <option value="Nottingham">Nottingham</option>
                  <option value="Oxford">Oxford</option>
                  <option value="Perth">Perth</option>
                  <option value="Peterborough">Peterborough</option>
                  <option value="Plymouth">Plymouth</option>
                  <option value="Portsmouth">Portsmouth</option>
                  <option value="Preston">Preston</option>
                  <option value="Ripon">Ripon</option>
                  <option value="Salford">Salford</option>
                  <option value="Salisbury">Salisbury</option>
                  <option value="Sheffield">Sheffield</option>
                  <option value="Southampton">Southampton</option>
                  <option value="St Albans">St Albans</option>
                  <option value="Stirling">Stirling</option>
                  <option value="Stoke-on-Trent">Stoke-on-Trent</option>
                  <option value="Sunderland">Sunderland</option>
                  <option value="Swansea">Swansea</option>
                  <option value="Truro">Truro</option>
                  <option value="Wakefield">Wakefield</option>
                  <option value="Wells">Wells</option>
                  <option value="Westminster">Westminster</option>
                  <option value="Winchester">Winchester</option>
                  <option value="Wolverhampton">Wolverhampton</option>
                  <option value="Worcester">Worcester</option>
                  <option value="York">York</option>
                </select>
              </div>


              <div>
                <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  id="address.country"
                  value={userData.userAddress.country || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                >
                  <option value="" disabled>Select a country</option>
                  <option value="Australia">Australia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Canada">Canada</option>
                  <option value="China">China</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="India">India</option>
                  <option value="Japan">Japan</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  {/* Add more countries as needed */}
                </select>
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
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
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
