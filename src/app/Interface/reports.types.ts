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
