"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";


import { OpeningHours } from "@/types/OpeningHours";
import { Dispatch, SetStateAction } from "react";
import { WeekDay } from "@/types/WeekDay";
import { DateTime } from "luxon";

interface BusinessOpeningDaysFormProps {
    businessId: string,
    setBusinessOpeningHours: Dispatch<SetStateAction<OpeningHours | null>>
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BusinessOpeningDaysForm: React.FC<BusinessOpeningDaysFormProps> = ({ businessId, setBusinessOpeningHours }) => {

    const form = useForm<OpeningHours>({
        defaultValues: {
            day: WeekDay.Unknown,
        },
    });

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit("")} className="space-y-4">

                    {/* Availability */}
                    <div className="space-y-3">

                        <FormLabel className="text-lg font-bold text-black">Availability</FormLabel>

                        {/* Days of the Week */}
                        <div className="grid grid-cols-4 gap-3 pl-3">
                            {daysOfWeek.map((day) => (
                                <FormField
                                    key={day}
                                    control={form.control}
                                    name="openingHours.day"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-2">
                                            <Checkbox
                                                checked={field.value?.includes(day) || false}
                                                onCheckedChange={(checked) => {
                                                    const newDays =
                                                        checked
                                                            ? [...(field.value || []), day]
                                                            : field.value?.filter((d) => d !== day) || [];
                                                    form.setValue("openingHours.day", newDays);
                                                }}
                                            />
                                            <FormLabel className="text-sm font-semibold text-black">{day}</FormLabel>
                                        </FormItem>
                                    )}
                                />

                            ))}
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
    );
};

export default BusinessOpeningDaysForm;
