import { apiGetLatLng } from '@/apis/weather'

const getCoords = async (city: string) => {
  try {
    const res = await apiGetLatLng(city)
    const data = res.data
    return data.length > 0 ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null
  } catch (err) {
    return { lat: 31.2222, lon: 121.4581 }
  }
}
//获取城市的经纬度
export async function useCoords(city: string) {
  let coords
  try {
    const res = await getCoords(city)
    console.log('res', res)
    if (!res) return
    const { lat, lon } = res
    coords = {
      name: city,
      lat,
      lon,
    }
  } catch (err) {
    coords = {
      name: 'Shenzhen',
      lat: 31.2222,
      lon: 121.4581,
    }
  }
  return {
    coords,
  }
}
