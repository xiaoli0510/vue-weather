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
