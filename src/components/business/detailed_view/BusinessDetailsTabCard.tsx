
'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import BusinessListingConnector from "@/connectors/BusinessListingConnector";
import BusinessAddressDetailsController from "@/controllers/business/BusinessAddressDetailsController";
import { businessAddressDetailsFormSchema } from "@/forms/business/schemas/BusinessAddressDetailsFormSchema";
import { CreateBusinessAddressDetails } from "@/types/business/CreateBusinessAddressDetails";
import { useEffect, useState } from "react";


interface BusinessDetailsTabCardProps {
    businessId: string
}

const BusinessDetailsTabCard: React.FC<BusinessDetailsTabCardProps> = ({
    businessId
}) => {

    const businessAddressFormSchema =
        useForm<z.infer<typeof businessAddressDetailsFormSchema>>({
            resolver: zodResolver(businessAddressDetailsFormSchema),
            defaultValues: {
                businessName: "",
                buildingName: "",
                street: "",
                city: "",
                country: "",
                county: "",
                postcode: ""
            }
        })

    const onSubmit: (data: CreateBusinessAddressDetails) => Promise<void> = async (data: CreateBusinessAddressDetails) => {

        const result = await BusinessAddressDetailsController.submitForm(data, businessId);
        result;
    };


    const [businessDetails, setBusinessDetails] =
        useState<{
            addressDetails: any;
            contactDetails: any;
            specifications: any;
        } | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(
        () => {
            const fetchBusinessDetails = async () => {
                try {
                    setLoading(true);
                    const result = await BusinessListingConnector.getBusinessListing(businessId);
                    setBusinessDetails(result);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load business details.");
                } finally {
                    setLoading(false);
                }
            };

            fetchBusinessDetails();
        }, [businessId]
    );

    return (

        <Tabs defaultValue="address" className="w-full max-w-7xl">
            <TabsList className="grid w-full grid-cols-3 h-18 shadow-light">
                <TabsTrigger value="address" className="text-lg font-semibold data-[state=active]:bg-softBlue">Address</TabsTrigger>
                <TabsTrigger value="contact-details" className="text-lg font-semibold data-[state=active]:bg-softBlue">Contact Details</TabsTrigger>
                <TabsTrigger value="specifications" className="text-lg font-semibold data-[state=active]:bg-softBlue">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="address" className="pt-3">



                {
                    loading ? (
                        <Card className="pb-3 bg-softBlue">
                            <CardHeader>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">
                                    Loading your business address details...
                                </p>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card className="pb-3 bg-softBlue">
                            <CardHeader>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="p-4 space-y-3">
                                    <p><strong>Building Name:</strong> {businessDetails?.addressDetails?.buildingName || ""}</p>
                                    <p><strong>Street:</strong> {businessDetails?.addressDetails?.street || ""}</p>
                                    <p><strong>City:</strong> {businessDetails?.addressDetails?.city || ""}</p>
                                    <p><strong>Country:</strong> {businessDetails?.addressDetails?.country || ""}</p>
                                    <p><strong>County:</strong> {businessDetails?.addressDetails?.county || ""}</p>
                                    <p><strong>Postcode:</strong> {businessDetails?.addressDetails?.postcode || ""}</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Sheet >
                                    <SheetTrigger asChild>
                                        <Button variant={"yellow"} className='w-1/4'>Edit</Button>
                                    </SheetTrigger>
                                    <SheetContent className="!w-full max-w-2xl"
                                        onOpenAutoFocus={(e) => e.preventDefault()} // ✅ Prevents focus hijacking
                                        onCloseAutoFocus={(e) => e.preventDefault()} // ✅ Prevents forced focus shifts
                                    >
                                        <SheetHeader>
                                            <SheetTitle className="flex mb-5">Update Address Details</SheetTitle>
                                            <SheetDescription>

                                            </SheetDescription>
                                        </SheetHeader>

                                        <Form {...businessAddressFormSchema}>
                                            <form
                                                onSubmit={businessAddressFormSchema.handleSubmit(onSubmit)}
                                                className="space-y-3"
                                            >
                                                <div className="flex justify-end">
                                                    <FormField
                                                        control={businessAddressFormSchema.control}
                                                        name="businessName"
                                                        render={({ field }) => (
                                                            <FormItem className="w-2/3">
                                                                <FormLabel>Business Name</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        variant="shadowNoBorder"
                                                                        className=""
                                                                        placeholder="Enter your business name"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription>

                                                                </FormDescription>
                                                                <FormMessage className="text-text text-red-500" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="flex justify-end">
                                                    <FormField
                                                        control={businessAddressFormSchema.control}
                                                        name="buildingName"
                                                        render={({ field }) => (
                                                            <FormItem className="w-2/3">
                                                                <FormLabel>Building Name (optional)</FormLabel>
                                                                <FormControl>
                                                                    <Input variant="shadowNoBorder" className="" placeholder="Enter a name of a building" {...field} />
                                                                </FormControl>
                                                                <FormDescription>

                                                                </FormDescription>
                                                                <FormMessage className="text-text text-red-500" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="flex justify-end">
                                                    <FormField
                                                        control={businessAddressFormSchema.control}
                                                        name="street"
                                                        render={({ field }) => (
                                                            <FormItem className="w-2/3">
                                                                <FormLabel>Street</FormLabel>
                                                                <FormControl>
                                                                    <Input variant="shadowNoBorder" className="" placeholder="Enter a street " {...field} />
                                                                </FormControl>
                                                                <FormDescription>

                                                                </FormDescription>
                                                                <FormMessage className="text-text text-red-500" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="flex justify-end">
                                                    <FormField
                                                        control={businessAddressFormSchema.control}
                                                        name="city"
                                                        render={({ field }) => (
                                                            <FormItem className="w-2/3">
                                                                <FormLabel>City</FormLabel>
                                                                <FormControl>
                                                                    <Input variant="shadowNoBorder" className="" placeholder="Enter a city " {...field} />
                                                                </FormControl>
                                                                <FormDescription>

                                                                </FormDescription>
                                                                <FormMessage className="text-text text-red-500" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="flex justify-end">
                                                    <FormField
                                                        control={businessAddressFormSchema.control}
                                                        name="country"
                                                        render={({ field }) => (
                                                            <FormItem className="w-2/3">
                                                                <FormLabel>Country</FormLabel>
                                                                <FormControl>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger className="bg-white text-black dark:bg-secondaryBlack dark:text-darkText" id="accountType">
                                                                            <SelectValue placeholder="Select a country" />
                                                                        </SelectTrigger>
                                                                        <SelectContent position="popper">
                                                                            <SelectItem value="Placeholder">Select a country</SelectItem>
                                                                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                                                            <SelectItem value="United States">United States</SelectItem>
                                                                            <SelectItem value="China">China</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage className="text-text text-red-500" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="flex justify-end">
                                                    <FormField
                                                        control={businessAddressFormSchema.control}
                                                        name="county"
                                                        render={({ field }) => (
                                                            <FormItem className="w-2/3">
                                                                <FormLabel>County (optional)</FormLabel>
                                                                <FormControl>
                                                                    <Input variant="shadowNoBorder" className="" placeholder="Enter a county " {...field} />
                                                                </FormControl>
                                                                <FormDescription>

                                                                </FormDescription>
                                                                <FormMessage className="text-text text-red-500" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="flex justify-end">
                                                    <FormField
                                                        control={businessAddressFormSchema.control}
                                                        name="postcode"
                                                        render={({ field }) => (
                                                            <FormItem className="w-2/3">
                                                                <FormLabel>Postcode</FormLabel>
                                                                <FormControl>
                                                                    <Input variant="shadowNoBorder" className="" placeholder="Enter a postcode " {...field} />
                                                                </FormControl>
                                                                <FormDescription>

                                                                </FormDescription>
                                                                <FormMessage className="text-text text-red-500" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="flex justify-end pt-4">
                                                    <Button
                                                        variant="green"
                                                        type="submit"
                                                        className="w-1/3"
                                                    >Save changes
                                                    </Button>
                                                </div>

                                            </form>
                                        </Form>

                                        <SheetFooter>
                                            <SheetClose asChild>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </CardFooter>
                        </Card>
                    )
                }

            </TabsContent>
            <TabsContent value="contact-details" className="pt-3">
                <Card className="pb-3 bg-softBlue">
                    <CardHeader>

                        <CardTitle></CardTitle>

                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>

                    </CardContent>

                    <CardFooter>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={"yellow"} className='w-1/3'>Edit</Button>
                            </SheetTrigger>
                            <SheetContent className="!w-full max-w-2xl">
                                <SheetHeader>
                                    <SheetTitle>Edit Contact Details</SheetTitle>
                                    <SheetDescription>

                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            First Name
                                        </Label>
                                        <Input id="name" placeholder='Enter the first name of the primary contact' value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Last Name
                                        </Label>
                                        <Input id="name" placeholder='Enter the last name of the primary contact' value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="username" placeholder='Enter an email' value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Phone number
                                        </Label>
                                        <Input id="username" placeholder='Enter a phone number for contact' value="" className="col-span-3" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button variant="green" type="submit">Save changes</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                    </CardFooter>

                </Card>
            </TabsContent>
            <TabsContent value="specifications" className="pt-3">
                <Card className="pb-3 bg-softBlue">
                    <CardHeader>
                        <CardTitle></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>
                        <p>Some placeholder specifications details</p>

                    </CardContent>
                    <CardFooter>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={"yellow"} className='w-1/3'>Edit</Button>
                            </SheetTrigger>
                            <SheetContent className="!w-full max-w-2xl">
                                <SheetHeader>
                                    <SheetTitle>Edit Contact Details</SheetTitle>
                                    <SheetDescription>

                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            First Name
                                        </Label>
                                        <Input id="name" value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Last Name
                                        </Label>
                                        <Input id="name" value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="username" value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="username" value="" className="col-span-3" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button variant="green" type="submit">Save changes</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>


                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default BusinessDetailsTabCard;