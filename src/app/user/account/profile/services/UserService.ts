// services/userService.ts
import { UpdatedUserRequest, User } from "@/app/user/account/profile/types/User";

export const fetchUserData = async (userId: string): Promise<User | null> => {
  try {
    const res = await fetch(`http://localhost:8080/cashew/wanderer/user/profile/${userId}`);
    if (res.ok) {
      return await res.json();
    } else {
      console.error("Failed to fetch user data", res.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const updateUserData = async (
  userId: string,
  updatedUserRequest: UpdatedUserRequest
): Promise<User | null> => {
  try {
    const res = await fetch(`http://localhost:8080/cashew/wanderer/user/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserRequest),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      return await res.json();
    } else {
      console.error("Failed to update profile", res.status);
      return null;
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    return null;
  }
};
