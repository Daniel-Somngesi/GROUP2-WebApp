export interface CurrentUser {
  UserName: string;
  UserRole: string;
  EmployeeType: string;
  HasProfile: string;
  HasChild: string;
}


export interface UserRole {
  userRole_Id: number;
  userRole_Name: string;
}
