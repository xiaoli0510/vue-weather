export interface IResMoon<T> {
  code: string
  updateTime: string
  fxLink: string
  moonrise: string
  moonset: string
  moonPhase: T[]
  refer: {
    sources: string[]
    license: string[]
  }
}

export interface IResMoonPhase {
  fxTime: string
  value: string
  name: string
  illumination: string
  icon: string
}
