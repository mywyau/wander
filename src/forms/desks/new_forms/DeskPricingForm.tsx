"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import DeskPricingConnector from "@/connectors/desk/DeskPricingConnector";
import { UpdateDeskPricing } from "@/types/desk/UpdateDeskPricing";
import { Dispatch, SetStateAction } from "react";


interface DeskPricingFormProps {
  deskId: string,
  setDeskPricing: Dispatch<SetStateAction<UpdateDeskPricing | null>>
}

const DeskPricingForm: React.FC<DeskPricingFormProps> = ({ deskId, setDeskPricing }) => {

  const form = useForm<UpdateDeskPricing>(
    {
      // resolver: zodResolver(deskPricingDetailsFormSchema),
      defaultValues:
      {
        pricePerHour: 0,
        pricePerDay: 0,
        pricePerWeek: 0,
        pricePerMonth: 0,
        pricePerYear: 0
      },
    }
  );

  const onUpdateDeskSubmit = async (data: UpdateDeskPricing) => {
    try {
      const result = await DeskPricingConnector.submitForm(data, deskId);
      console.log("Form submission successful:", result);

      setDeskPricing(
        (prevDetails) => (
          {
            ...prevDetails!,
            pricePerHour: data.pricePerHour,
            pricePerDay: data.pricePerDay,
            pricePerWeek: data.pricePerWeek,
            pricePerMonth: data.pricePerMonth,
            pricePerYear: data.pricePerYear
          }
        )
      );

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateDeskSubmit)} className="space-y-3">

        <div className="flex justify-end">
          <FormField control={form.control} name="pricePerHour" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>Price per hour</FormLabel>
              <FormControl>
                <Input variant="shadowNoBorder" placeholder="Enter a price for per hour" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end">
          <FormField control={form.control} name="pricePerDay" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>Price per day</FormLabel>
              <FormControl>
              <Input variant="shadowNoBorder" placeholder="Enter a price for per day" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end">
          <FormField control={form.control} name="pricePerWeek" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>Price per week</FormLabel>
              <FormControl>
              <Input variant="shadowNoBorder" placeholder="Enter a price for per week" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end">
          <FormField control={form.control} name="pricePerMonth" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>Price per month</FormLabel>
              <FormControl>
              <Input variant="shadowNoBorder" placeholder="Enter a price for per month" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end">
          <FormField control={form.control} name="pricePerYear" render={({ field }) => (
            <FormItem className="w-2/3">
              <FormLabel>Price per year</FormLabel>
              <FormControl>
              <Input variant="shadowNoBorder" placeholder="Enter a price for per year" {...field} />
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

export default DeskPricingForm;
