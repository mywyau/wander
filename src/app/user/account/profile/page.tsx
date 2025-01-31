"use client";

import { UpdatedUserRequest, User } from "@/app/user/account/profile/types/User";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CustomButton from "./components/CustomButton";
import EmailInputField from "./components/EmailInputField";
import ProfileSection from "./components/ProfileSection";
import SelectField from "./components/SelectInputField";
import TextInputField from "./components/TextInputField";
import { updateUserDataField } from "./form/ProfileForm";
import { fetchUserData, updateUserData } from "./services/UserService";


export default function UserAccountProfilePage() {

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    
    if (status === "authenticated" && session?.user?.email) {
      setIsLoading(true);
      fetchUserData(session.user.email)
        .then((data) => {
          if (data) setUserData(data);
          else setMessage("Failed to fetch user data.");
        })
        .catch(() => setMessage("An error occurred while fetching user data."))
        .finally(() => setIsLoading(false));
    }
  }, [session, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => updateUserDataField(prevData, id, value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!session?.user?.email || !userData) {
      setMessage("User email or data is missing.");
      return;
    }

    const updatedUserRequest: UpdatedUserRequest = {
      loginDetails: { ...userData.userLoginDetails },
      address: { ...userData.userAddress },
      personalDetails: { ...userData.userPersonalDetails },
    };

    const cleanRequest =
      JSON.parse(
        JSON.stringify(updatedUserRequest, (key, value) =>
          value === null || value === undefined || value === "" ? undefined : value
        )
      );

    const updatedData = await updateUserData(session.user.email, cleanRequest);

    if (updatedData) {
      setUserData(updatedData);
      setMessage("Profile updated successfully.");
      setIsEditing(false);
    } else {
      setMessage("Failed to update profile.");
    }

    setIsLoading(false);
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

              <TextInputField
                id="login.username"
                label="Username"
                value={userData.userLoginDetails.username}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <EmailInputField
                id="login.email"
                label="Email"
                value={userData.userLoginDetails.email}
                onChange={handleChange}
                disabled={!isEditing}
              />

            </ProfileSection>

            <ProfileSection title="Personal Details">

              <TextInputField
                id="personal.firstName"
                label="First Name"
                value={userData.userPersonalDetails.firstName || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <TextInputField
                id="personal.lastName"
                label="Last Name"
                value={userData.userPersonalDetails.lastName || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

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

              <EmailInputField
                id="personal.email"
                label="Email"
                value={userData.userPersonalDetails.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <TextInputField
                id="personal.company"
                label="Company"
                value={userData.userPersonalDetails.company || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </ProfileSection>

            <ProfileSection title="Address">

              <TextInputField
                id="address.street"
                label="Street"
                value={userData.userAddress.street || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <SelectField
                id="address.city"
                label="City"
                value={userData.userAddress.city || ""}
                onChange={handleChange}
                options={[
                  { value: "Aberdeen", label: "Aberdeen" },
                  { value: "Armagh", label: "Armagh" },
                  { value: "Bangor", label: "Bangor" },
                  { value: "Bath", label: "Bath" },
                  { value: "Belfast", label: "Belfast" },
                  { value: "Birmingham", label: "Birmingham" },
                  { value: "Bradford", label: "Bradford" },
                  { value: "Brighton and Hove", label: "Brighton and Hove" },
                  { value: "Bristol", label: "Bristol" },
                  { value: "Cambridge", label: "Cambridge" },
                  { value: "Canterbury", label: "Canterbury" },
                  { value: "Cardiff", label: "Cardiff" },
                  { value: "Carlisle", label: "Carlisle" },
                  { value: "Chelmsford", label: "Chelmsford" },
                  { value: "Chester", label: "Chester" },
                  { value: "Chichester", label: "Chichester" },
                  { value: "Coventry", label: "Coventry" },
                  { value: "Derby", label: "Derby" },
                  { value: "Derry", label: "Derry" },
                  { value: "Dundee", label: "Dundee" },
                  { value: "Durham", label: "Durham" },
                  { value: "Edinburgh", label: "Edinburgh" },
                  { value: "Ely", label: "Ely" },
                  { value: "Exeter", label: "Exeter" },
                  { value: "Glasgow", label: "Glasgow" },
                  { value: "Gloucester", label: "Gloucester" },
                  { value: "Hereford", label: "Hereford" },
                  { value: "Inverness", label: "Inverness" },
                  { value: "Kingston upon Hull", label: "Kingston upon Hull" },
                  { value: "Lancaster", label: "Lancaster" },
                  { value: "Leeds", label: "Leeds" },
                  { value: "Leicester", label: "Leicester" },
                  { value: "Lichfield", label: "Lichfield" },
                  { value: "Lincoln", label: "Lincoln" },
                  { value: "Lisburn", label: "Lisburn" },
                  { value: "Liverpool", label: "Liverpool" },
                  { value: "London", label: "London" },
                  { value: "Manchester", label: "Manchester" },
                  { value: "Newcastle upon Tyne", label: "Newcastle upon Tyne" },
                  { value: "Newport", label: "Newport" },
                  { value: "Norwich", label: "Norwich" },
                  { value: "Nottingham", label: "Nottingham" },
                  { value: "Oxford", label: "Oxford" },
                  { value: "Perth", label: "Perth" },
                  { value: "Peterborough", label: "Peterborough" },
                  { value: "Plymouth", label: "Plymouth" },
                  { value: "Portsmouth", label: "Portsmouth" },
                  { value: "Preston", label: "Preston" },
                  { value: "Ripon", label: "Ripon" },
                  { value: "Salford", label: "Salford" },
                  { value: "Salisbury", label: "Salisbury" },
                  { value: "Sheffield", label: "Sheffield" },
                  { value: "Southampton", label: "Southampton" },
                  { value: "St Albans", label: "St Albans" },
                  { value: "Stirling", label: "Stirling" },
                  { value: "Stoke-on-Trent", label: "Stoke-on-Trent" },
                  { value: "Sunderland", label: "Sunderland" },
                  { value: "Swansea", label: "Swansea" },
                  { value: "Truro", label: "Truro" },
                  { value: "Wakefield", label: "Wakefield" },
                  { value: "Wells", label: "Wells" },
                  { value: "Westminster", label: "Westminster" },
                  { value: "Winchester", label: "Winchester" },
                  { value: "Wolverhampton", label: "Wolverhampton" },
                  { value: "Worcester", label: "Worcester" },
                  { value: "York", label: "York" },
                ]}
                disabled={!isEditing}
              />

              <SelectField
                id="address.country"
                label="Country"
                value={userData.userAddress.country || ""}
                onChange={handleChange}
                options={[
                  { value: "United Kingdom", label: "United Kingdom" },
                  // Add other countries
                ]}
                disabled={!isEditing}
              />

              <TextInputField
                id="address.postcode"
                label="Postcode"
                value={userData.userAddress.postcode || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              {/* Add more fields for address */}
            </ProfileSection>

            <div className="col-span-full">
              <CustomButton
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </CustomButton>
            </div>

            <div className="col-span-full">
              <CustomButton
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-gray-500 text-white hover:bg-gray-600"
              >
                {isEditing ? "Cancel Editing" : "Edit"}
              </CustomButton>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
