export interface Activity {
  id: number,
  name: string,
  repeat: string,
  start: Date,
  end: Date,
  schedule_Id: number,
  companyId: number,
  companyName: string,
  signUpsCount: number
}
