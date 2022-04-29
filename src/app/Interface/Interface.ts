export interface UserRoleData {
  userRole_Id?: any;
  userRole_Name: string;
}

export interface EmployeeData {
  employee_Id?: any;
  employee_Name: string;
  employee_Surname: any;
  phone_Number: any;
  gender: string;
  employeeType_Id?:any;
  address_Line1: string;
  address_Line2?: string;
  city: string;
  doB: string;
  id_Number: string;
  postal_Code: string;
}

export interface EmployeeTypeData {
  employeeType_Id?:any;
  employeeType_Name:string;
  employeeType_Description?:string;
}
