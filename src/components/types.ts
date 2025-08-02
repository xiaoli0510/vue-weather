export interface IHourItem {
  time: string
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number
        air_temperature: number
        cloud_area_fraction: number
        relative_humidity: number
        wind_from_direction: number
        wind_speed: number
      }
    }
    next_12_hours: {
      summary: {
        symbol_code: string
      }
      details: {}
    }
    next_1_hours: {
      summary: {
        symbol_code: string
      }
      details: {
        precipitation_amount: number
      }
    }
    next_6_hours: {
      summary: {
        symbol_code: string
      }
      details: {
        precipitation_amount: number
      }
    }
  }
}
