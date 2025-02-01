"use client";

import { User } from "@/app/user/account/profile/types/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";


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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   setUserData((prevData) => updateUserDataField(prevData, id, value));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const updatedData = await updateUserData(session.user.email, cleanRequest);

  //   if (updatedData) {
  //     setUserData(updatedData);
  //     setMessage("Profile updated successfully.");
  //     setIsEditing(false);
  //   } else {
  //     setMessage("Failed to update profile.");
  //   }

  //   setIsLoading(false);
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={"handleSubmit"} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Address Details</CardTitle>
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
              <Button variant="default" >Cancel</Button>
              <Button variant="neutral">Deploy</Button>
            </CardFooter>
          </Card>


        </form>

      </div>

    </div>
  );
}
