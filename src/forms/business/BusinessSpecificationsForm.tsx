"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import BusinessSpecificationsConnector from "@/connectors/business/BusinessSpecificationsConnector";
import { BusinessSpecifications } from "@/types/business/BusinessListing";
import { UpdateBusinessSpecifications } from "@/types/business/UpdateBusinessSpecifications";
import { Dispatch, SetStateAction } from "react";

interface BusinessSpecificationsFormProps {
    businessId: string,
    setBusinessSpecifications: Dispatch<SetStateAction<BusinessSpecifications | null>>
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BusinessSpecificationsForm: React.FC<BusinessSpecificationsFormProps> = ({ businessId, setBusinessSpecifications }) => {

    const form = useForm<UpdateBusinessSpecifications>({
        defaultValues: {
            businessName: "",
            description: "",
            availability: {
                days: [],
                startTime: "09:00",
                endTime: "17:00",
            }
        },
    });

    const onUpdateBusinessSubmit = async (data: UpdateBusinessSpecifications) => {
        try {
            const result = await BusinessSpecificationsConnector.submitForm(data, businessId);
            console.log("Form submission successful:", result);

            setBusinessSpecifications((prevDetails) => ({
                ...prevDetails!,
                businessName: data.businessName,
                description: data.description,
                availability: data.availability
            }));

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        // <Card className="p-6 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-bg">
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onUpdateBusinessSubmit)} className="space-y-4">

                    {/* Business Name */}
                    <div className="flex justify-end">
                        <FormField control={form.control} name="businessName" render={({ field }) => (
                            <FormItem className="w-2/3">
                                <FormLabel className="font-bold text-black">Business Name</FormLabel>
                                <FormControl>
                                    <Input variant="shadowNoBorder" placeholder="Enter business name" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                    </div>

                    {/* Description */}
                    <div className="flex justify-end">
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem className="w-2/3">
                                <FormLabel className="font-bold text-black">Description</FormLabel>
                                <FormControl>
                                    <Input variant="shadowNoBorder" placeholder="Enter a short description" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                    </div>

                    {/* Availability */}
                    <div className="space-y-3">

                        <FormLabel className="text-lg font-bold text-black">Availability</FormLabel>

                        {/* Days of the Week */}
                        <div className="grid grid-cols-4 gap-3 pl-3">
                            {daysOfWeek.map((day) => (
                                <FormField
                                    key={day}
                                    control={form.control}
                                    name="availability.days"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-2">
                                            <Checkbox
                                                checked={field.value?.includes(day) || false}
                                                onCheckedChange={(checked) => {
                                                    const newDays =
                                                        checked
                                                            ? [...(field.value || []), day]
                                                            : field.value?.filter((d) => d !== day) || [];
                                                    form.setValue("availability.days", newDays);
                                                }}
                                            />
                                            <FormLabel className="text-sm font-semibold text-black">{day}</FormLabel>
                                        </FormItem>
                                    )}
                                />

                            ))}
                        </div>

                        {/* Start Time */}
                        <div className="pt-3 pb-3">
                            <FormField
                                control={form.control}
                                name="availability.startTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold text-black">Start Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                                className="w-1/3 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-softPurple px-3 py-2 text-lg font-bold"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* End Time */}
                        <div className="pt-3 pb-3">
                            <FormField
                                control={form.control}
                                name="availability.endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold text-black">End Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                                className="w-1/3 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-softPurple px-3 py-2 text-lg font-bold"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <Button variant='green' type="submit" className="w-1/3 hover:bg-softGreen">
                            Save Changes
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
        // </Card>
    );
};

export default BusinessSpecificationsForm;
