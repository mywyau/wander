export interface UserLoginDetails {
    id: number;
    userId: string;
    username: string;
    passwordHash: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserPersonalDetails {
    userId: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    email?: string;
    company?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserAddress {
    userId: string;
    street?: string;
    city?: string;
    country?: string;
    county?: string;
    postcode?: string;
    createdAt: string;
    updatedAt: string;
  }
  
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