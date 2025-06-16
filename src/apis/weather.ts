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
