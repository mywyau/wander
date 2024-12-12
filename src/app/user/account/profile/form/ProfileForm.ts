// utils/formUtils.ts
import { User } from "@/app/user/account/profile/types/User";

export const updateUserDataField = (
  userData: User | null,
  fieldId: string,
  value: string
): User | null => {
  if (!userData) return null;

  if (fieldId.startsWith("login.")) {
    return {
      ...userData,
      userLoginDetails: { ...userData.userLoginDetails, [fieldId.split(".")[1]]: value },
    };
  } else if (fieldId.startsWith("personal.")) {
    return {
      ...userData,
      userPersonalDetails: { ...userData.userPersonalDetails, [fieldId.split(".")[1]]: value },
    };
  } else if (fieldId.startsWith("address.")) {
    return {
      ...userData,
      userAddress: { ...userData.userAddress, [fieldId.split(".")[1]]: value },
    };
  }
  return userData;
};
