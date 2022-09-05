
export interface Provice {
  name: string,
  cityTown: Array<CityTown>
}

export interface CityTown {
  name: string,
  province:string,
  suburbs: Array<Suburb>
}

export interface Suburb {
  name: string
}
