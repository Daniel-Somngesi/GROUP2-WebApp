export interface Employee {
  id: number,
  name: string,
  surname: string,
  idNumber: string,
  gender: string,
  email: string,
  phoneNumber: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  postalCode: string,
  employeeTypeId: number,
  employeeTypeName: string
}

export interface EmployeeType {
  id: number,
  name: string,
  description: string,
  employeesCount: number
}
