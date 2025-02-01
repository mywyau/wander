import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Link from "next/link";
import { Button } from '../ui/button';


export default function ExampleSheet1() {
    return (
        <Sheet>

            <SheetTrigger asChild>
                <Button>Open Sidebar</Button>
            </SheetTrigger>

            <SheetContent>

                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>
                        {/* Make changes to your profile here. Click save when youre done. */}
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-5">
                    <Link href={`/`} className="hover:text-blue-700">
                        Homepage Search
                    </Link>
                </div>

                <div className="mt-5">
                    <Link href="/business/view-all" className="hover:text-blue-700">
                        View all of your businesses
                    </Link>
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        {/* <Button type="submit">Save changes</Button> */}
                    </SheetClose>
                </SheetFooter>

            </SheetContent>
        </Sheet>

    )
};