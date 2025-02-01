"use client";

import NavigationMenuDemo from "@/components/navigation-menu-demo-";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";




export default function UserAccountProfilePage() {

  return (
    <div className="min-h-screen">

      <div>
        {NavigationMenuDemo()}
      </div>


      {/* Card */}

      <div className="flex item-center justify-center px-4">
        <Card className="max-w-2xl p-4 shadow-lg">

          <CardHeader>
            <CardTitle>Address Details</CardTitle>
            <CardDescription>Add your address details</CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Street</Label>
                  <Input id="name" className="w-full" placeholder="Street" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">City</Label>
                  <Input id="name" placeholder="City" />
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
      </div>
    </div>
  );
}
