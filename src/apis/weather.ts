import { getToken } from '@/utils/createToken'
import service from '@/utils/service.'
import axios from 'axios'
import OpenWeatherMap from 'openweathermap-ts'

const openWeather = new OpenWeatherMap({
  apiKey: '03529234da0b399e8332896853683dc1',
})
// 根据城市名称获取天气
export const apiGetWeatherByCity = (city: string) => {
  return openWeather
    .getCurrentWeatherByCityName({
      cityName: city,
    })
    .catch((error) => {
      console.log(error)
    })
}
// 根据城市经纬度获取天气质量
export const apiGetAirPollution = (params: { lat: string; lon: string }) => {
  return axios.get('http://api.openweathermap.org/data/2.5/air_pollution', {
    params: Object.assign(
      {
        appid: '03529234da0b399e8332896853683dc1',
      },
      params,
    ),
  })
}

// 根据城市经纬度获取24h的天气预报
export const apiGetHourForecast = (params: { lat: string; lon: string }) => {
  return axios.get('https://api.met.no/weatherapi/locationforecast/2.0/compact', {
    params,
  })
}

// 根据location获取天气警报
export const apiGetWarn = async () => {
  return service.get('v7/warning/now?location=101280601&lang=zh')
}
// 获取最近10天的历史数据
export const apiHistory = async () => {
  return service.get('v7/historical/weather?location=101280601&date=20200725')
}
// 获取紫外线指数
export const apiGetIndex = async () => {
  return service.get('v7/indices/1d?location=101280601&type=5')
}

// 根据城市经纬度获取24h天气
export const apiGet24hData = async () => {
  return service.get('v7/weather/24h?location=101280601&lang=zh')
}
// 根据城市获取月相
export const apiGetMoon = async () => {
  return service.get('v7/astronomy/moon?location=101280601&date=20250806')
}
