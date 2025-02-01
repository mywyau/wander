"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function UserAccountProfilePage() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid auto-rows-auto gap-6">
        <form onSubmit={"handleSubmit"} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card className="w-3/4">
            <CardHeader>
              <CardTitle>Address Details</CardTitle>
              <CardDescription>Add your address details</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Street</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">City</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Country</Label>
                    <Select>
                      <SelectTrigger
                        className="bg-white text-black dark:bg-secondaryBlack dark:text-darkText"
                        id="framework"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="nuxt">Africa</SelectItem>
                        <SelectItem value="astro">China</SelectItem>
                        <SelectItem value="next">United Kingdom</SelectItem>
                        <SelectItem value="sveltekit">United States of America</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">County</Label>
                    <Input id="name" placeholder="County" />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Postcode</Label>
                    <Input id="name" placeholder="Postcode" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="red" className="w-1/3">Cancel</Button>
              <Button variant="green" className="w-1/3">Submit</Button>
            </CardFooter>
          </Card>


        </form>

      </div>

    </div>
  );
}
