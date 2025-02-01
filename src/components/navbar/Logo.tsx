import { AppConfig } from "@/config/AppConfig";
import Link from "next/link";

export default function Logo() {
    return (
        <a
            href={`http://${AppConfig.getWanderUrl()}/wander`}
            className="text-2xl font-semibold whitespace-nowrap dark:text-white"
            target="_self"
        >
            Wander
        </a>
    )
}