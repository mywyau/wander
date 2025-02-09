"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import OfficeAddressDetailsConnector from "@/connectors/office/OfficeAddressDetailsConnector";
import { OfficeAddressDetails } from "@/types/office/OfficeListing";
import { Dispatch, SetStateAction } from "react";
import { UpdateOfficeAddressDetails } from "@/types/office/UpdateOfficeAddressDetails";

interface OfficeAddressFormProps {
  officeId: string,
  setOfficeAddress: Dispatch<SetStateAction<UpdateOfficeAddressDetails | null>>
}

const OfficeAddressForm: React.FC<OfficeAddressFormProps> = ({ officeId, setOfficeAddress }) => {

  const form = useForm<UpdateOfficeAddressDetails>(
    {
      // resolver: zodResolver(officeAddressDetailsFormSchema),
      defaultValues:
      {
        buildingName: "",
        street: "",
        city: "",
        country: "",
        county: "",
        postcode: "",
      },
    }
  );

  const onUpdateOfficeSubmit = async (data: UpdateOfficeAddressDetails) => {
    try {
      const result = await OfficeAddressDetailsConnector.submitForm(data, officeId);
      console.log("Form submission successful:", result);

      setOfficeAddress(
        (prevDetails) => (
          {
            ...prevDetails!,
            buildingName: data.buildingName,
            street: data.street,
            city: data.city,
            country: data.country,
            county: data.county,
            postcode: data.postcode,
          }
        )
      );

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateOfficeSubmit)} className="space-y-3">

        {/* Building Name */}
        <div className="flex justify-end">
          <FormField control={form.control} name="buildingName" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>Building Name</FormLabel>
              <FormControl>
                <Input variant="shadowNoBorder" placeholder="Enter a building name" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        {/* Street */}
        <div className="flex justify-end">
          <FormField control={form.control} name="street" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input variant="shadowNoBorder" placeholder="Enter street" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        {/* City */}
        <div className="flex justify-end">
          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input variant="shadowNoBorder" placeholder="Enter city" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>


        {/* Country Select */}
        <div className="flex justify-end">
          <FormField control={form.control} name="country" render={({ field }) => (
            <FormItem className="w-2/3  ">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-white text-black dark:bg-secondaryBlack dark:text-darkText">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end">
          <FormField control={form.control} name="county" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>County</FormLabel>
              <FormControl>
                <Input variant="shadowNoBorder" placeholder="Enter a county" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end">
          <FormField control={form.control} name="postcode" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>Postcode</FormLabel>
              <FormControl>
                <Input variant="shadowNoBorder" placeholder="Enter the postcode of the office" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="green" type="submit" className="w-1/3 hover:bg-softGreen">
            Save Changes
          </Button>
        </div>

      </form>
    </Form>
  );
};

export default OfficeAddressForm;
