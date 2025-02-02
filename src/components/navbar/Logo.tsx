import { AppConfig } from "@/config/AppConfig";
import Link from "next/link";

export default function Logo() {
    return (
        <a
            href={`http://${AppConfig.getWanderUrl()}/wander`}
            className="text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-gray-100"
            target="_self"
        >
            Wander
        </a>
    )
}