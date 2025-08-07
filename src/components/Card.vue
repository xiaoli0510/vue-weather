<script setup lang='ts'>
import { SquareArrowUpRight, Table, Wind } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { apiGetHourForecast, apiGetWeatherByCity } from '@/apis/weather';
import { useFollowStore } from '@/store/follow';
import type { CurrentResponse } from 'openweathermap-ts/dist/types';
import { fahrenheitToCelsius } from '@/utils/weather';
import type { IHourItem } from './types';
import Air from './Air.vue';
import HourForecast from './HourForecast.vue';
import DayForecast from './DayForecast.vue';
import Warn from './Warn.vue';
import SunRiseSet from './SunRiseSet.vue';
import Precip from './Precip.vue';
import Visibility from './Visibility.vue';
import Dew from './Dew.vue';
import Average from './Average.vue';
import Press from './Press.vue';
import Moon from './Moon.vue';
import FeelLike from './FeelLike.vue';
import Rays from './Rays.vue';
import WindCom from './WindCom.vue';
import AirQualityMap from './AirQualityMap.vue';

defineOptions({
    name: 'CardCom'
})
const emits = defineEmits([
    'close'
])

interface Props {
    show: boolean,
    city?: string
}
const props = withDefaults(defineProps<Props>(), {
    show: true,
    city: () => 'Shenzhen'
})

const close = () => {
    emits('close')
}

// #region 获取current data
const curData = ref<CurrentResponse | void>()
const getCurWeather = async () => {
    const res = await apiGetWeatherByCity('Shenzhen')
    curData.value = res
}
// #endregion 获取current data

// #region 获取24h hourData和 10day dayData
const nextRainWind = ref<IHourItem | null>(null)
const hour24Data = ref<IHourItem[]>([])
const day10Data = ref<{ [key: string]: IHourItem }>({})
const get24Hour10DayData = async () => {
    apiGetHourForecast({
        lat: '31.2222',
        lon: '121.4581',
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


onMounted(() => {
    getCurWeather()
    // get24Hour10DayData()
})

const { add } = useFollowStore()
const addCity = () => {
    add(props.city)
}

const isShow = ref(false)
</script>
<template>
    <div v-if="show" class="absolute bottom-0 left-0 w-full bg-gray-400 rounded-t-lg" style="height:calc(100%  - 10px)">
        <div class="rounded-t-lg p-4 text-foreground h-full" v-if="curData">
            <div class="flex text-xs justify-between">
                <div @click="close">取消</div>
                <div @click="addCity">添加</div>
            </div>
            <div class="my-6 text-center">
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
            <div class="flex flex-col overflow-y-auto rounded-t-lg" style="height:calc(100% - 210px)">
                <!-- #region 空气质量指数 -->
                <Air v-if="isShow" />
                <!-- #region 小时预报 -->
                <HourForecast :nextRainWind="nextRainWind" :hour24Data="hour24Data" v-if="isShow" />
                <!-- #endregion 小时预报 -->
                <!-- #region 10日天气预报 -->
                <DayForecast :day10Data="day10Data" v-if="isShow" />
                <!-- #endregion 10日天气预报 -->
                <!-- #region 空气质量地图 -->
                <AirQualityMap />
                <!-- #endregion 空气质量地图 -->
                <!-- #region 天气警报 -->
                <Warn v-if="isShow" />
                <!-- #endregion 天气警报 -->
                <!-- #region 体感温度+紫外线指数 -->
                <div class="mt-2 flex flex-row justify-between gap-2" v-if="isShow">
                    <FeelLike :curData="curData" />
                    <Rays />
                </div>
                <!-- #endregion 体感温度+紫外线指数 -->
                <!-- #region 风 -->
                <WindCom :curData="curData" v-if="isShow" />
                <!-- #endregion 风 -->

                <!-- #region 日落+降水 -->
                <div class="mt-2 flex flex-row justify-between gap-2" v-if="isShow">
                    <SunRiseSet :curData="curData" />
                    <Precip :hour24Data="hour24Data" :nextRainWind="nextRainWind" />
                </div>
                <!-- #endregion 日落+降水 -->
                <!-- #region 能见度+湿度 -->
                <div class="mt-2 flex flex-row justify-between gap-2" v-if="isShow">
                    <Visibility :curData="curData" />
                    <Dew :curData="curData" />
                </div>
                <!-- #endregion 能见度+湿度 -->
                <!-- #region 月 -->
                <Moon v-if="isShow" />
                <!-- #endregion 月 -->
                <!-- #region 平均+气压 -->
                <div class="mt-2 flex flex-row justify-between gap-2" v-if="isShow">
                    <Average :curData="curData" />
                    <Press />
                </div>
                <!-- #endregion 平均+气压 -->
                <div
                    class="flex justify-between mt-2 border-t-1 border-b-1 border-foreground/20 py-2 text-xs text-foreground/50">
                    <span>在“地图”中打开</span>
                    <SquareArrowUpRight />
                </div>
            </div>
        </div>
    </div>
</template>