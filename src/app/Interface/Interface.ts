export interface UserRoleData {
  userRole_Id: number;
  userRole_Name: string;
}

export interface ConsumablesData {
  consumable_Id: number;
  name: string;
  description: string;
  quantity: number;
}

export interface MedicalAidTypeData {
  medicalAidTypeId: number;
  medicalAidTypeName: string;
}

export interface EmployeeData {
  employee_Id: number;
  employee_Name: string;
  employee_Surname: string;
  phone_Number: any;
  gender: string;
  employeeType_ID?:any;
  address_Line1: string;
  address_Line2: string;
  city: string;
  doB: string;
  employee_Email:any;
  id_Number: string;
  postal_code: string;
  employeeType_Name:string;
}

export interface EmployeeTypeData {
  employeeType_ID?: any;
  employeeType_Name: string;
  employeeType_Description: string;
}

export interface BookingTypeData {
  bookingType_ID?:any;
  bookingType_Name:string;
  bookingType_Description?:string;
}
export interface SlotTypeData {
  slotType_Id: number;
  name: string;
}


export interface DocumentData {
  document_Id: number;
  document_Name: string;
  docPath: string;
  description:string;
}

export interface DocumentToCreate {
  document_Name: string;
  docPath: string;
}

export interface QuestionData {
  question_Id:any;
  question_Text:string;
}

export interface FeeTypeData {
  feeType_Id: number;
  feeType_Name: string;
  feeType_Description: string;

}

export interface AllergyData {
  allergy_Id: number;
  allergy_Name: string;
}

export interface SurveyData {
  survey_Id: number;
  survey_Name: string;
  startDate: Date;
  endDate: Date;
}

export interface FeeData {
  fee_Id:number;
  fee_Name:string;
  fee_Amount:string;
  feeType_Id:number;
  feeType_Name:string;
}
