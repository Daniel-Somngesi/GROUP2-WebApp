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

export interface BookingReportOverview{
  fromDate: string,
  toDate: string,
  slots:Array<Slot>,
  bookings:Array<Booking>,
}
