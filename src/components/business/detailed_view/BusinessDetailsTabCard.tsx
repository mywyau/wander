
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BusinessDetailsTabCardProps {

}


const BusinessDetailsTabCard: React.FC<BusinessDetailsTabCardProps> = ({

}) => {

    return (

        <Tabs defaultValue="address" className="w-full max-w-7xl">
            <TabsList className="grid w-full grid-cols-3 h-18 shadow-light">
                <TabsTrigger value="address" className="text-lg font-semibold data-[state=active]:bg-softBlue">Address</TabsTrigger>
                <TabsTrigger value="contact-details" className="text-lg font-semibold data-[state=active]:bg-softBlue">Contact Details</TabsTrigger>
                <TabsTrigger value="specifications" className="text-lg font-semibold data-[state=active]:bg-softBlue">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="address" className="pt-3">
                <Card className="pb-3 bg-softBlue">
                    <CardHeader>

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
                                            Building Number
                                        </Label>
                                        <Input id="name" placeholder='Building Number' value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Street
                                        </Label>
                                        <Input id="name" placeholder='Enter a street' value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            City
                                        </Label>
                                        <Input id="name" placeholder='Enter a city' value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Country
                                        </Label>
                                        <Input id="username" value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            County
                                        </Label>
                                        <Input id="username" placeholder='Enter the county for your business' value="" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Postcode
                                        </Label>
                                        <Input id="postcode" placeholder='Enter the post code for your business' value="" className="col-span-3" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button variant="green" type="submit" >Save changes</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                    </CardFooter>
                </Card>
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