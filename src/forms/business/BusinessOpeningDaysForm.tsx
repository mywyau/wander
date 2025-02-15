"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import BusinessAvailabilityConnector from "@/connectors/business/BusinessAvailabilityConnector";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { businessOpeningDaysFormSchema } from "./schemas/BusinessOpeningDaysFormSchema";

interface BusinessOpeningDaysFormProps {
    businessId: string;
    setBusinessOpeningDays: Dispatch<SetStateAction<string[] | null>>;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BusinessOpeningDaysForm: React.FC<BusinessOpeningDaysFormProps> = ({ businessId, setBusinessOpeningDays }) => {

    const form = useForm({
        resolver: zodResolver(businessOpeningDaysFormSchema),
        defaultValues: {
            days: [],
        },
    });

    const onUpdateOpeningDaysSubmit = async (data: { days: string[] }) => {
        try {
            // Submit the selected days to the server
            const result = await BusinessAvailabilityConnector.submitDayForm(data.days, businessId);
            console.log("Form submission successful:", result);

            // Update the business opening days in state
            setBusinessOpeningDays(data.days);

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onUpdateOpeningDaysSubmit)} className="space-y-4">

                    {/* Availability */}
                    <div className="space-y-3">
                        <FormLabel className="text-lg font-bold text-black">Availability</FormLabel>

                        {/* Days of the Week */}
                        <div className="grid grid-cols-4 gap-3 pl-3">
                            {daysOfWeek.map((day) => (
                                <FormField
                                    key={day}
                                    control={form.control}
                                    name="days"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-2">
                                            <Checkbox
                                                checked={field.value?.includes(day) || false}
                                                onCheckedChange={(checked) => {
                                                    const newDays =
                                                        checked
                                                            ? [...(field.value || []), day]
                                                            : field.value?.filter((d) => d !== day) || [];
                                                    form.setValue("days", newDays); // Update the days in form state
                                                }}
                                            />
                                            <FormLabel className="text-sm font-semibold text-black">{day}</FormLabel>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        {/* Validation Error */}
                        <FormMessage className="text-red-500" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <Button variant="green" type="submit" className="w-1/3 hover:bg-softGreen">
                            Save Changes
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    );
};

export default BusinessOpeningDaysForm;
