import { getToken } from '@/utils/createToken'
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
  const token = await getToken()
  return axios.get(
    'https://nk6tup5h7u.re.qweatherapi.com/v7/warning/now?location=101280601&lang=zh',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
// 获取最近10天的历史数据
export const apiHistory = async () => {
  const token = await getToken()
  return axios.get(
    'https://nk6tup5h7u.re.qweatherapi.com/v7/historical/weather?location=101280601&date=20200725',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
// 获取紫外线指数
export const apiGetIndex = async () => {
  const token = await getToken()
  return axios.get(
    'https://nk6tup5h7u.re.qweatherapi.com/v7/indices/1d?location=101280601&type=5',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
