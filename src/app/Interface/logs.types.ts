export interface TransactionLog {
  id: number,
  username: string,
  table: string,
  operation: string,
  dateTime: string,
  newValues: string,
  oldValues: string
}
