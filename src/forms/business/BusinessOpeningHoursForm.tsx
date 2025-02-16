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


interface BusinessOpeningHoursFormProps {
    businessId: string,
    setBusinessOpeningHours: Dispatch<SetStateAction<OpeningHours | null>>
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BusinessOpeningHoursForm: React.FC<BusinessOpeningHoursFormProps> = ({ businessId, setBusinessOpeningHours }) => {

    const form = useForm<OpeningHours>({
        defaultValues: {
            openingTime: DateTime.fromObject({ hour: 9, minute: 0 }),
            closingTime: DateTime.fromObject({ hour: 17, minute: 0 }),
        },
    });

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit("")} className="space-y-4">

                    {/* Availability */}
                    <div className="space-y-3 ">

                        <FormLabel className="text-lg font-bold text-black">Availability</FormLabel>

                        {/* Start Time */}
                        <div className="pt-3 pb-3">
                            <FormField
                                control={form.control}
                                name="openingHours.openingTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold text-black">Start Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                                className="w-1/4 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-softPurple px-3 py-2 text-lg font-bold"
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
                                name="openingHours.closingTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold text-black">End Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                                className="w-1/4 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-softPurple px-3 py-2 text-lg font-bold"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex pt-4">
                        <Button variant='green' type="submit" className="w-1/3 hover:bg-softGreen">
                            Save Changes
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    );
};

export default BusinessOpeningHoursForm;
