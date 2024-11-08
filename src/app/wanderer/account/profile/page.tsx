"use client";

// pages/profile.tsx
import { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
  };
  bio?: string; // Optional field
  createdAt: string;
  lastLogin: string;
  lastAddressUpdate: string;
  lastPasswordChange: string;
}

const mockUserData: User = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
  phone: '+1234567890',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    postcode: '12345',
  },
  bio: "I love programming and sharing knowledge.",
  createdAt: "2022-01-01T10:00:00Z",
  lastLogin: "2023-11-01T10:00:00Z",
  lastAddressUpdate: "2023-10-15T10:00:00Z",
  lastPasswordChange: "2023-09-01T10:00:00Z",
};

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
    <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">{title}</h2>
    <div className="grid grid-cols-1 gap-2">
      {children}
    </div>
  </div>
);

export default function ProfilePage() {
  const [user] = useState<User>(mockUserData);
  // const router = useRouter();

  // const handleEdit = (section: string) => {
  //   router.push(`/edit-profile/${section}`);
  // };

  return (
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <ProfileSection title="Profile Picture">
          <div className="flex items-center">
            <img src="/path/to/profile-picture.jpg" alt="Profile Picture" className="w-24 h-24 rounded-full border-2 border-blue-500 mr-4" />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
              Change Picture
            </button>
          </div>
        </ProfileSection>

        <ProfileSection title="Login Details">
          <p><strong>Username:</strong> {user.username} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('login')}
          >
            Change
          </button>
          </p>
          <p><strong>Email:</strong> {user.email} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('login')}
          >
            Change
          </button>
          </p>
        </ProfileSection>

        <ProfileSection title="Contact Details">
          <p><strong>First Name:</strong> {user.firstName} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('contact')}
          >
            Change
          </button>
          </p>
          <p><strong>Last Name:</strong> {user.lastName} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('contact')}
          >
            Change
          </button>
          </p>
          <p><strong>Phone:</strong> {user.phone} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('contact')}
          >
            Change
          </button>
          </p>
        </ProfileSection>

        <ProfileSection title="Address">
          <p><strong>Street:</strong> {user.address.street} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('address')}
          >
            Change
          </button>
          </p>
          <p><strong>City:</strong> {user.address.city} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('address')}
          >
            Change
          </button>
          </p>
          <p><strong>State:</strong> {user.address.state} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('address')}
          >
            Change
          </button>
          </p>
          <p><strong>Postcode:</strong> {user.address.postcode} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('address')}
          >
            Change
          </button>
          </p>
        </ProfileSection>

        <ProfileSection title="About Me">
          <p>{user.bio || "This user has not set a bio yet."} <button className="text-blue-600 hover:underline"
          // onClick={() => handleEdit('about')}
          >
            Change
          </button>
          </p>
        </ProfileSection>

        <ProfileSection title="Account Details">
          <p><strong>Account Created On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </ProfileSection>

        <ProfileSection title="Recent Activity">
          <ul className="list-disc list-inside">
            <li>Logged in on {new Date(user.lastLogin).toLocaleString()}</li>
            <li>Updated address on {new Date(user.lastAddressUpdate).toLocaleString()}</li>
            <li>Changed password on {new Date(user.lastPasswordChange).toLocaleString()}</li>
          </ul>
        </ProfileSection>

        <ProfileSection title="Social Media Links">
          <p><a href="https://twitter.com/user" className="text-blue-600 hover:underline">Twitter</a></p>
          <p><a href="https://linkedin.com/in/user" className="text-blue-600 hover:underline">LinkedIn</a></p>
          <p><a href="https://github.com/user" className="text-blue-600 hover:underline">GitHub</a></p>
        </ProfileSection>
      </div>
    </div>
  );
}
