"use client";

import NavigationMenuDemo from "@/components/navigation-menu-demo-";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UserAccountProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      
      {/* Navigation Menu */}
      {/* <div className="w-full max-w-6xl flex justify-center">
        <NavigationMenuDemo />
      </div> */}

      {/* Card Section */}
      <div className="mt-8 w-full flex justify-center">
        <Card className="w-full max-w-2xl p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Address Details</CardTitle>
            <CardDescription>Fill in your address details below.</CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="grid w-full gap-6">
                {/* Street */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="street">Street</Label>
                  <Input id="street" className="w-full" placeholder="Enter your street" />
                </div>

                {/* City */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" className="w-full" placeholder="Enter your city" />
                </div>

                {/* Country */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger className="bg-white text-black dark:bg-secondaryBlack dark:text-darkText w-full" id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="usa">United States of America</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* County */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="county">County</Label>
                  <Input id="county" className="w-full" placeholder="Enter your county" />
                </div>

                {/* Postcode */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" className="w-full" placeholder="Enter your postcode" />
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
