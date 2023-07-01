export enum UserStatus {
  NEWLY_CREATED,
  ACTIVE,
  INACTIVE,
}

export enum UserType {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export enum CustomerRank {
  BRONZE,
  SILVER,
  GOLD,
  DIAMOND,
}

export interface Customer {
  _id: string; // User ID
  status: UserStatus; // User status: 0 - newly-created, need to be activated | 1 - active | 2 - inactive
  type: UserType; // User status: 0 - newly-created, need to be activated | 1 - active | 2 - inactive
  rank: number; // Customer rank when customer's point reaches a required number for a rank level, their rank will be updated
  point: number; // Customer point earned when purchasing products
  rank_point: number; // Customer rank point earned when purchasing products to mark the loyalty level
  email: string; // User's email
  fullname: string; // User's full name
  phone: string; // User's phone number
  avatar: string; // User image URL
  del_flag: boolean; // Flag to indicate whether the user has been deleted or not
  active_token: string; // User's active_token, generated when activating the account or resetting the password
}
