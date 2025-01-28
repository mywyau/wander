import Link from "next/link";

interface NavbarLinksProps {
    isSidebarOpen: boolean;
}

export default function NavbarLinks({ isSidebarOpen }: NavbarLinksProps) {
    return (
        <div className={`w-full md:block md:w-auto ${isSidebarOpen ? "block" : "hidden"}`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            </ul>
        </div>
    );
}
