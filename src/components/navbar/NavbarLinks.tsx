import { AppConfig } from "@/config/AppConfig";

interface NavbarLinksProps {
    isSidebarOpen: boolean;
}

export default function NavbarLinks({ isSidebarOpen }: NavbarLinksProps) {
    return (
        <div className={`w-full md:block md:w-auto ${isSidebarOpen ? "block" : "hidden"}`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <a
                    href={`http://${AppConfig.getWanderUrl()}/wander/user/account/profile`}
                    className="text-l text-black hover:text-gray-100 dark:text-gray-300 dark:hover:text-blue-500"
                    target="_self"
                >
                    Profile
                </a>
            </ul>
        </div>
    );
}
