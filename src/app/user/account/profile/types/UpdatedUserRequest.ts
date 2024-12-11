import { UpdatedPersonalDetails, UpdatedUserLoginDetails } from "./User";
import { UserAddress } from "./UserAddress";


export interface UpdatedUserRequest {
  loginDetails?: UpdatedUserLoginDetails;
  address?: UserAddress;
  personalDetails?: UpdatedPersonalDetails;
}

