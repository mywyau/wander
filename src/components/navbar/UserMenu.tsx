import { AppConfig } from "@/config/AppConfig";
import { getSession, signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  
  const { data: session, status } = useSession();

  console.log('Session:', session);

  return (
    <div className="flex items-center space-x-4">
      {session ? (
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 dark:text-gray-300">
            {session.user?.name || session.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            className="text-l text-black hover:text-gray-100 dark:text-gray-300 dark:hover:text-blue-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <a
          href={`http://${AppConfig.getReggieUrl()}/reggie/login`}
          className="text-l text-black hover:text-gray-100 dark:text-gray-300 dark:hover:text-blue-500"
          target="_self"
        >
          Login
        </a>
        
      )}
    </div>
  );
}
