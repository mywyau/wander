"use client";

import { User } from "@/app/user/account/profile/types/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import CustomButton from "./components/CustomButton";
import EmailInputField from "./components/EmailInputField";
import ProfileSection from "./components/ProfileSection";
import SelectField from "./components/SelectInputField";
import TextInputField from "./components/TextInputField";
import { updateUserDataField } from "./form/ProfileForm";
import { updateUserData } from "./services/UserService";


export default function UserAccountProfilePage() {

  // const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile data
  // useEffect(() => {

  //   if (status === "authenticated" && session?.user?.email) {
  //     setIsLoading(true);
  //     fetchUserData(session.user.email)
  //       .then((data) => {
  //         if (data) setUserData(data);
  //         else setMessage("Failed to fetch user data.");
  //       })
  //       .catch(() => setMessage("An error occurred while fetching user data."))
  //       .finally(() => setIsLoading(false));
  //   }
  // }, [session, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => updateUserDataField(prevData, id, value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // if (!session?.user?.email || !userData) {
    //   setMessage("User email or data is missing.");
    //   return;
    // }

    // const updatedUserRequest: UpdatedUserRequest = {
    //   loginDetails: { ...""
    //   address: { ..  //   personalDetails: { ...  // };

    // const cleanRequest =
    //   JSON.parse(
    //     JSON.stringify(updatedUserRequest, (key, value) =>
    //       value === null || value === undefined || value === "" ? undefined : value
    //     )
    //   );

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
  // if (!session || !session.user || status === "unauthenticated") return <p>Please log in to view your profile.</p>;
  if (isLoading && !userData) return <p>Loading profile...</p>;
  // if (!userData) return <p>No user data available.</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <ProfileSection title="Login Details">

              <TextInputField
                id="login.username"
                label="Username"
                value={""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <EmailInputField
                id="login.email"
                label="Email"
                value={""}
                onChange={handleChange}
                disabled={!isEditing}
              />

            </ProfileSection>

            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">Framework</Label>
                      <Select>
                        <SelectTrigger
                          className="bg-white text-black dark:bg-secondaryBlack dark:text-darkText"
                          id="framework"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="next">Next.js</SelectItem>
                          <SelectItem value="sveltekit">SvelteKit</SelectItem>
                          <SelectItem value="astro">Astro</SelectItem>
                          <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>Cancel</Button>
                <Button variant="neutral">Deploy</Button>
              </CardFooter>
            </Card>

            <ProfileSection title="Personal Details">

              <Label
                htmlFor="terms"
                className="mb-2"
              >
                Accept terms and conditions
              </Label>

              <Input
                type="text"
                placeholder="First Name"
                value={""}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />

              {/* <TextInputField
                id="personal.firstName"
                label="First Name"
                value={""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <TextInputField
                id="personal.lastName"
                label="Last Name"
                value={""}
                onChange={handleChange}
                disabled={!isEditing}
              /> */}

              {/* <div>
                <label htmlFor="personal.contactNumber" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  id="personal.contactNumber"
                  value={""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div> */}

              {/* <EmailInputField
                id="personal.email"
                label="Email"
                value={""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <TextInputField
                id="personal.company"
                label="Company"
                value={""}
                onChange={handleChange}
                disabled={!isEditing}
              /> */}
            </ProfileSection>

            <ProfileSection title="Address">

              <TextInputField
                id="address.street"
                label="Street"
                value={""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <SelectField
                id="address.city"
                label="City"
                value={""}
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
                value={""}
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
                value={""}
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
