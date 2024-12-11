import { UserAddress } from "./UserAddress";
import { UserLoginDetails } from "./UserLoginDetails";
import { UserPersonalDetails } from "./UserPersonalDetails";

export interface User {
  userId: string;
  userLoginDetails: UserLoginDetails;
  userPersonalDetails: UserPersonalDetails;
  userAddress: UserAddress;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatedUserRequest {
  loginDetails?: UpdatedUserLoginDetails;
  address?: UserAddress;
  personalDetails?: UpdatedPersonalDetails;
}


export interface UpdatedUserLoginDetails {
  username?: string;
  passwordHash?: string;
  email?: string;
  role?: string;
}

export interface UpdatedUserAddress {
  street?: string;
  city?: string;
  country?: string;
  county?: string;
  postcode?: string;
}

export interface UpdatedPersonalDetails {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  email?: string;
  company?: string;
}