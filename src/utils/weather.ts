import { DEGWIND } from '@/constants/weather'

export const fahrenheitToCelsius = (degree: number) => {
  return Math.round(((degree - 32) * 5) / 9)
}

export const getWindDirection = (deg: number) => {
  deg = (deg + 360) % 360
  for (const [range, direction] of DEGWIND) {
    if (range.includes('-')) {
      const [min, max] = range.split('-').map(Number)
      if (deg >= min && deg <= max) {
        return direction
      }
    } else if (deg === Number(range)) {
      return direction
    }
  }
}

//将时间戳s格式化为hh:mm
export const formateSecond = (timestamp: number, isMs: boolean = false) => {
  const date = isMs ? new Date(timestamp) : new Date(timestamp * 1000)
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

//通过温度和湿度技术露点温度

export const calculateDewPoint = (tempC: number, humidity: number) => {
  const a = 17.27
  const b = 237.7
  const gamma = (a * tempC) / (b + tempC) + Math.log(humidity / 100)
  return (b * gamma) / (a - gamma)
}
