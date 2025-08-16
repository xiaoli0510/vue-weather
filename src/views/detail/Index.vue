<script setup lang='ts'>
import { SquareArrowUpRight } from 'lucide-vue-next';
import { onMounted, ref, watchEffect } from 'vue';
import { apiGetAirPollution, apiGetHourForecast, apiGetWeatherByCity } from '@/apis/weather';
import type { CurrentResponse } from 'openweathermap-ts/dist/types';
import { fahrenheitToCelsius } from '@/utils/weather';
import type { IHourItem } from './components/types';
import Aqi from './components/Aqi.vue';
import HourForecast from './components/HourForecast.vue';
import DayForecast from './components/DayForecast.vue';
import Warn from './components/Warn.vue';
import SunRiseSet from './components/SunRiseSet.vue';
import Precip from './components/Precip.vue';
import Visibility from './components/Visibility.vue';
import Dew from './components/Dew.vue';
import Average from './components/Average.vue';
import Press from './components/Press.vue';
import Moon from './components/Moon.vue';
import FeelLike from './components/FeelLike.vue';
import Rays from './components/Rays.vue';
import WindCom from './components/WindCom.vue';
import AirQualityMap from './components/AirQualityMap.vue';
import { useCurCityStore } from '@/store/curCity';

defineOptions({
    name: 'DetailView'
})

const curCityStore = useCurCityStore()
onMounted(() => {
    curCityStore.setCity({
        name: 'ShenZhen',
        lon: 121.4581,
        lat: 31.2222
    })
})
// #region 获取current data
const curData = ref<CurrentResponse | void>()
const getCurWeather = async () => {
    const res = await apiGetWeatherByCity(curCityStore!.city!.name)
    curData.value = res
}
// #endregion 获取current data

// #region 获取24h hourData和 10day dayData
const nextRainWind = ref<IHourItem | null>(null)
const hour24Data = ref<IHourItem[]>([])
const day10Data = ref<{ [key: string]: IHourItem }>({})
const get24Hour10DayData = async () => {
    apiGetHourForecast({
        lat: curCityStore.city?.lat ?? 0,
        lon: curCityStore.city?.lon ?? 0,
    }).then(res => {
        const hour = new Date().getHours()
        const tempDate = new Date().setHours(hour, 0, 0, 0)
        const hourArr: Array<IHourItem> = []
        const timeseries = res.data.properties.timeseries
        timeseries.forEach((item: IHourItem) => {
            if (new Date(item.time).getTime() >= tempDate) {
                if (hourArr.length === 24) return
                if (!nextRainWind.value && (item.data.next_1_hours.summary.symbol_code.search('rain') !== -1 || item.data.next_1_hours.summary.symbol_code.search('cloudy') !== -1)) {
                    nextRainWind.value = item
                }
                hourArr.push(item)
            }
        })
        hour24Data.value = hourArr

        const dayObj: { [key: string]: IHourItem } = {}
        timeseries.forEach((item: IHourItem) => {
            const key = item.time.split('T')[0]
            if (dayObj[key]) {
                return;
            }
            dayObj[key] = item;
        })
        day10Data.value = dayObj
    }).catch(err => {
        console.log(err);
    })
}

const airData = ref()
const getAirPollution = async () => {
    const res = await apiGetAirPollution({
        lat: String(curCityStore!.city!.lat),
        lon: String(curCityStore!.city!.lon),
    })
    airData.value = res.data
}
watchEffect(async () => {
    if (curCityStore.city && curCityStore.city.lat) {
        await getAirPollution()
        await getCurWeather()
        await get24Hour10DayData()
    }
})
</script>
<template>
    <div class="bg-gray-400 p-2 text-white">
        <div class="text-center" v-if="curData">
            <div class="text-lg">{{ curData.name }}</div>
            <div class="text-6xl my-2">{{ fahrenheitToCelsius(curData.main.temp) }}</div>
            <div>
                <span class="text-xs vertical-text">最高</span>
                <span class="text-3xl">{{ fahrenheitToCelsius(curData.main.temp_max) }}°</span>
                <span class="text-xs vertical-text ml-1">最低</span>
                <span class="text-3xl">{{ fahrenheitToCelsius(curData.main.temp_min) }}°</span>
            </div>
            <div>{{ curData.weather[0].main }}</div>
        </div>
        <!-- #region 空气质量指数 -->
        <Aqi :airData="airData" />
        <!-- #region 小时预报 -->
        <HourForecast :nextRainWind="nextRainWind" :hour24Data="hour24Data" />
        <!-- #endregion 小时预报 -->
        <!-- #region 10日天气预报 -->
        <DayForecast :day10Data="day10Data" />
        <!-- #endregion 10日天气预报 -->
        <!-- #region 空气质量地图 -->
        <AirQualityMap :airData="airData" />
        <!-- #endregion 空气质量地图 -->
        <!-- #region 天气警报 -->
        <Warn />
        <!-- #endregion 天气警报 -->
        <!-- #region 体感温度+紫外线指数 -->
        <div class="mt-2 flex flex-row justify-between gap-2">
            <FeelLike :curData="curData" />
            <Rays />
        </div>
        <!-- #endregion 体感温度+紫外线指数 -->
        <!-- #region 风 -->
        <WindCom :curData="curData" />
        <!-- #endregion 风 -->

        <!-- #region 日落+降水 -->
        <div class="mt-2 flex flex-row justify-between gap-2">
            <SunRiseSet :curData="curData" />
            <Precip :hour24Data="hour24Data" :nextRainWind="nextRainWind" />
        </div>
        <!-- #endregion 日落+降水 -->
        <!-- #region 能见度+湿度 -->
        <div class="mt-2 flex flex-row justify-between gap-2">
            <Visibility :curData="curData" />
            <Dew :curData="curData" />
        </div>
        <!-- #endregion 能见度+湿度 -->
        <!-- #region 月 -->
        <Moon />
        <!-- #endregion 月 -->
        <!-- #region 平均+气压 -->
        <div class="mt-2 flex flex-row justify-between gap-2">
            <Average :curData="curData" v-if="curData" />
            <Press />
        </div>
        <!-- #endregion 平均+气压 -->
        <div
            class="flex justify-between mt-2 border-t-1 border-b-1 border-foreground/20 py-2 text-xs text-foreground/50">
            <span>在“地图”中打开</span>
            <SquareArrowUpRight />
        </div>
    </div>
</template>