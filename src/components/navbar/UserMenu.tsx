import { AppConfig } from "@/config/AppConfig";
import { signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  // Grabbing session data using useSession hook (NextAuth will read the cookie automatically)
  const { data: session, status } = useSession();

  console.log('Session:', session); // Log session to check if it's being retrieved


  // if (status === "loading") {
  //   return <div>Loading...</div>; // Loading state, adjust as needed
  // }

  return (
    <div className="flex items-center space-x-4">
      {session ? (
        <div className="flex items-center space-x-3">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-gray-700 dark:text-gray-300">
            {session.user?.name || session.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <a
          href={`http://${AppConfig.getReggieUrl()}/login`}
          className="text-l text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500"
          target="_self"
        >
          Login
        </a>
      )}
    </div>
  );
}
