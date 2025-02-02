"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

export default function UserProfilePage() {

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, New York, NY",
    profilePic: "/images/profile-placeholder.png", // Placeholder image
  });

  return (
    <div className="min-h-screen flex flex-col items-center p-6">

      <div className="w-full max-w-4xl rounded-lg mb-5 p-1">

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/wander" className="hover:text-blue-800">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/wander/user/account/profile" className="hover:text-blue-800">
                User Profile
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Profile Header */}
      <div className="w-full max-w-4xl rounded-lg">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      </div>

      {/* Main Content: Grid Layout */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* Personal Info */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <Button variant="yellow" className="mt-3 hover:bg-softYellow">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your password and security settings.</p>
            <Button variant="yellow" className="mt-2 hover:bg-softYellow">Change Password</Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-md col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {/* <li>Booked a desk at XYZ Workspace - 2 days ago</li>
              <li>Updated account settings - 1 week ago</li>
              <li>Joined the platform - 2 months ago</li> */}
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
