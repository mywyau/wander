
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

        <Tabs defaultValue="address" className="w-full max-w-3xl">
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

                        Some placeholder address details

                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="contact-details" className="pt-3">
                <Card className="pb-3 bg-softBlue">
                    <CardHeader>

                        <CardTitle></CardTitle>

                    </CardHeader>
                    <CardContent className="space-y-2">
                        Some placeholder contact details

                    </CardContent>

                    <CardFooter>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>Open</Button>
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
                                            Primary Contact First Name
                                        </Label>
                                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Primary Contact Last Name
                                        </Label>
                                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="username" value="@peduarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="username" value="@peduarte" className="col-span-3" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit">Save changes</Button>
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
                        Some placeholder specifications details

                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default BusinessDetailsTabCard;