export interface Consumable {
  id: number,
  name: string
}

export interface RequestedConsumable {
  id: number,
  quantity: number,
  consumableId: number,
  consumableName: string,
  enrollmentId: number,
  classId: number,
  className: string,
  childId: number,
  childName: string
}

export interface ReceivedConsumable {
  id: number,
  requestedQuantity: number,
  receivedQuantity: number,
  consumableId: number,
  consumableName: string,
  enrollmentId: number,
  classId: number,
  className: string,
  childId: number,
  childName: string
}

