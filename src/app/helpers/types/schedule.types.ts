export interface Schedule {
  id: number,
  academicYear: string,
  startDate: string,
  endDate: string,
  rawStartDate: Date,
  rawEndDate: Date,
  slotsCount: number,
  eventsCount: number,
  classesCount: number,
  activitiesCount: number,
}
