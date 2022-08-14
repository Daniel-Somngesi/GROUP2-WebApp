export interface Booking {
  id: number,
  name: string,
  bookingDateTime: string,

  bookingTypeId: number,
  bookingType: string,

  parentId: number,
  parentFullName: string,

  slotId: number,
  slotDay: string,
  slotStartTime: string,
  slotEndTime: string,
}
