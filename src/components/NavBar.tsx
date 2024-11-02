import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-50 p-4">

      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="text-2xl font-semibold">
          <Link href="/">Wander</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-gray-700 hover:text-pink-800">
              Search
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/user/access" className="text-gray-700 hover:text-indigo-600">
              Register/Login
            </Link>
          </li>
          <li>
            <Link href="/business/dashboard" className="text-gray-700 hover:text-indigo-600">
              Business Dashboard
            </Link>
          </li>
          <li>
            <Link href="/developer" className="text-gray-700 hover:text-indigo-600">
              Dev Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
