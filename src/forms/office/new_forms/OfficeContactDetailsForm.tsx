"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import OfficeContactDetailsConnector from "@/connectors/office/OfficeContactDetailsConnector";
import { OfficeContactDetails } from "@/types/office/OfficeListing";
import { UpdateOfficeContactDetails } from "@/types/office/UpdateOfficeContactDetails";
import { Dispatch, SetStateAction } from "react";

interface OfficeContactDetailsFormProps {
    officeId: string,
    setOfficeContactDetails: Dispatch<SetStateAction<OfficeContactDetails | null>>
}

const OfficeContactDetailsForm: React.FC<OfficeContactDetailsFormProps> = ({ officeId, setOfficeContactDetails }) => {

    const form = useForm<UpdateOfficeContactDetails>(
        {
            // resolver: zodResolver(officeContactDetailsFormSchema),
            defaultValues:
            {
                primaryContactFirstName: "",
                primaryContactLastName: "",
                contactEmail: "",
                contactNumber: "",
                websiteUrl: ""
            },
        }
    );

    const onUpdateOfficeSubmit = async (data: UpdateOfficeContactDetails) => {
        try {
            const result = await OfficeContactDetailsConnector.submitForm(data, officeId);
            console.log("Form submission successful:", result);

            setOfficeContactDetails(
                (prevDetails) => (
                    {
                        ...prevDetails!,
                        primaryContactFirstName: data.primaryContactFirstName,
                        primaryContactLastName: data.primaryContactLastName,
                        contactEmail: data.contactEmail,
                        contactNumber: data.contactNumber,
                        websiteUrl: data.websiteUrl
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


                <div className="flex justify-end">
                    <FormField control={form.control} name="primaryContactFirstName" render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Primary Contact First Name</FormLabel>
                            <FormControl>
                                <Input variant="shadowNoBorder" placeholder="Enter a first name" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )} />
                </div>


                <div className="flex justify-end">
                    <FormField control={form.control} name="primaryContactLastName" render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Primary Contact Last Name</FormLabel>
                            <FormControl>
                                <Input variant="shadowNoBorder" placeholder="Enter a last name" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )} />
                </div>


                <div className="flex justify-end">
                    <FormField control={form.control} name="contactEmail" render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input variant="shadowNoBorder" placeholder="Enter an email" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )} />
                </div>

                <div className="flex justify-end">
                    <FormField control={form.control} name="contactNumber" render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                                <Input variant="shadowNoBorder" placeholder="Enter a phone number" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )} />
                </div>

                <div className="flex justify-end">
                    <FormField control={form.control} name="websiteUrl" render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Website Address</FormLabel>
                            <FormControl>
                                <Input variant="shadowNoBorder" placeholder="Enter the website url of the office" {...field} />
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

export default OfficeContactDetailsForm;
