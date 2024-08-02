export interface User {
  userId?: string;
  userName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userRoles: string[];
  userGroups: string[];
  userStatus: boolean;
  userPhoneNumber: string;
}
