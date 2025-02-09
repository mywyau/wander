"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import BusinessContactDetailsConnector from "@/connectors/BusinessContactDetailsConnector";
import { BusinessContactDetails } from "@/types/business/BusinessListing";
import { UpdateBusinessContactDetails } from "@/types/business/UpdateBusinessContactDetails";
import { Dispatch, SetStateAction } from "react";

interface BusinessContactDetailsFormProps {
    businessId: string,
    setBusinessContactDetails: Dispatch<SetStateAction<BusinessContactDetails | null>>
}

const BusinessContactDetailsForm: React.FC<BusinessContactDetailsFormProps> = ({ businessId, setBusinessContactDetails }) => {

    const form = useForm<UpdateBusinessContactDetails>(
        {
            // resolver: zodResolver(businessContactDetailsFormSchema),
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

    const onUpdateBusinessSubmit = async (data: UpdateBusinessContactDetails) => {
        try {
            const result = await BusinessContactDetailsConnector.submitForm(data, businessId);
            console.log("Form submission successful:", result);

            setBusinessContactDetails(
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
            <form onSubmit={form.handleSubmit(onUpdateBusinessSubmit)} className="space-y-3">


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
                                <Input variant="shadowNoBorder" placeholder="Enter the website url of the business" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )} />
                </div>

                <div className="flex justify-end pt-4">
                    <Button variant="green" type="submit" className="w-1/3">
                        Save Changes
                    </Button>
                </div>

            </form>
        </Form>
    );
};

export default BusinessContactDetailsForm;
