import { Booking } from "./booking.types"
import { Slot } from "./slot.types"

export interface SchoolReportOverview {
  date: string,
  totalStudents: number,
  totalAttendance: number,
  children: Array<SchoolClassAttendance>
}

export interface SchoolClassAttendance {
  childName: string,
  childSurname: string,
  timeIn: string,
  timeOut: string,
}

export interface ApplicationReportOverview {
  fromDate: string,
  toDate: string,
  totalApplications: string,
  applications: Array<ApplicationReportEntry>
}


export interface ApplicationReportEntry {
  date: string,
  specialNeeds: string,
  specialNeedsDescription: string,
  status: string,
  age: string,
}

export interface BookingReportOverview {
  fromDate: string,
  toDate: string,
  slots: Array<Slot>,
  bookings: Array<Booking>,
}


export interface SchoolEvaluationSurveyReport {
  name: string,
  average: string
}

export interface SchoolEvaluationSurveyReportForGraph {
  name: string,
  value: number
}

export interface ConsumableOverviewReport {
  className: string,
  enrollmentsCount: number,
  items: Array<ConsumableByClassReport>,
  businessItems: Array<ConsumableForBusinssDto>
}

export interface ConsumableByClassReport {
  name: string,
  quantityPerChild: number,
  quantityExpectedForClass: number,
  quantityReceivedForClass: number,

}

export interface ConsumableForBusinssDto {
  name: string,
  quantityExpectedForClass: number,
  quantityReceivedForClass: number,
}

export interface WeeklyClassReport {
  startDate: string,
  endDate: string,
  absentTotal: number,
  presentTotal: number,
  studentsTotal: number,
  schoolDays: number,
  expectedDays: number,
  overallAttendanceRate: number,
  items: Array<WeeklyClassReportItem>
}

export interface WeeklyClassReportItem {
  child: string,
  absent: number,
  present: number,
  expectedDays: number
}


export interface ConsumableByChild {
  consumableName: string,
  items:Array<GetConsumableItemByChild>

}

export interface GetConsumableItemByChild {
  childName: string,
  expected: number,
  received: number
}
