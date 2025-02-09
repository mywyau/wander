

import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


interface DeleteAllAlertDialogProps {
    deleteAllOfficeListings: () => Promise<void>;
}


const DeleteAllAlertDialog: React.FC<DeleteAllAlertDialogProps> = ({
    deleteAllOfficeListings,
}) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="red"
                    className="mt-5 hover:bg-softRed"
                >
                    Delete All
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-softRed">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all of your offices and desks.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-hardRed"
                        onClick={() => {
                            deleteAllOfficeListings();
                        }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteAllAlertDialog;