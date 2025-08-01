<script setup lang='ts'>
import { Progress } from '@/components/ui/progress'
import { CalendarDays, ChartLine, CircleGauge, Cloud, CloudHail, Droplet, Eclipse, Eye, SquareArrowUpRight, Sun, Sunset, Table, ThermometerSun, TriangleAlert, Waves, Wind } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { apiGetAirPollution, apiGetHourForecast, apiGetWeatherByCity } from '@/apis/weather';
import { useFollowStore } from '@/store/follow';
import type { CurrentResponse } from 'openweathermap-ts/dist/types';
import { fahrenheitToCelsius } from '@/utils/helper';

defineOptions({
    name: 'CardCom'
})
const emits = defineEmits([
    'close'
])
const progress = ref(13)

interface Props {
    show: boolean,
    city?: string
}
const props = withDefaults(defineProps<Props>(), {
    show: true,
    city: () => 'Shenzhen'
})
console.log(props.city)


const close = () => {
    emits('close')
}

// #region 获取current data
const data = ref<CurrentResponse | void>()
const getWeather = async () => {
    console.log(props.city)
    const res = await apiGetWeatherByCity('Shenzhen')
    data.value = res
}
// #endregion 获取current data


// #region 获取空气质量data
const airData = ref()
const getAirPollution = async () => {
    apiGetAirPollution({
        lat: '31.2222',
        lon: '121.4581',
    }).then(res => {
        console.log(res);
        airData.value = res.data
    }).catch(err => {
        console.log(err);
    })
}
// #endregion 获取空气质量data


// #region 获取hourData
const hourData = ref()
const getHourData = async () => {
    apiGetHourForecast({
        lat: '31.2222',
        lon: '121.4581',
    }).then(res => {
        hourData.value = res.data
    }).catch(err => {
        console.log(err);
    })
}



onMounted(() => {
    getWeather()
    getAirPollution()
    getHourData()
})

const { add } = useFollowStore()
const addCity = () => {
    add(props.city)
}
</script>
<template>
    <div v-if="show" class="absolute bottom-0 left-0 w-full bg-gray-400 rounded-t-lg" style="height:calc(100%  - 10px)">
        <div class="rounded-t-lg p-4 text-foreground h-full" v-if="data">
            <div class="flex text-xs justify-between">
                <div @click="close">取消</div>
                <div @click="addCity">添加</div>
            </div>
            <div class="my-6 text-center">
                <div class="text-lg">{{ data.name }}</div>
                <div class="text-6xl my-2">{{ fahrenheitToCelsius(data.main.temp) }}</div>
                <div>
                    <span class="text-xs vertical-text">最高</span>
                    <span class="text-3xl">{{ fahrenheitToCelsius(data.main.temp_max) }}°</span>
                    <span class="text-xs vertical-text ml-1">最低</span>
                    <span class="text-3xl">{{ fahrenheitToCelsius(data.main.temp_min) }}°</span>
                </div>
                <div>{{ data.weather[0].main }}</div>
            </div>
            <div class="flex flex-col overflow-y-auto rounded-t-lg" style="height:calc(100% - 210px)">
                <!-- #region 空气质量指数 -->
                <div v-if="airData" class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                    <div>{{ airData.list[0].main.aqi }}-{{ airData.list[0].main.aqi >= 8 ? '优' :
                        airData.list[0].main.aqi
                            >= 6 ? '良' : '中' }}</div>
                    <div class="my-2">
                        <Progress v-model="progress" class="w-full" />
                    </div>
                    <div class="text-xs">当前AQI(CN)为{{ airData.list[0].main.aqi }}</div>
                </div>
                <!-- #endregion 空气质量指数 -->
                <!-- #region 小时预报 -->
                <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                    <div class="text-xs border-b-1 border-foreground/20 leading-9">17:00左右预计有雨。阵风风速最高5米/秒。</div>
                    <div class="flex overflow-x-auto">
                        <div class="text-xs p-1 mr-6 text-center  whitespace-nowrap"
                            v-for="(item, index) in hourData.properties.timeseries" :key="index">
                            <template
                                v-if="new Date(item.time).getTime() >= new Date('2025-08-01 18:00').getTime() && index <= 23">
                                <div>{{ new Date(item.time).getHours() }}时</div>
                                <div>
                                    <template v-if="item.data.next_1_hours && item.data.next_1_hours.summary">
                                        <Cloud
                                            v-if="item.data.next_1_hours.summary.symbol_code.search('cloudy') !== -1" />
                                        <Sun color="yellow"
                                            v-if="item.data.next_1_hours.summary.symbol_code.search('sun') !== -1" />
                                        <CloudHail
                                            v-if="item.data.next_1_hours.summary.symbol_code.search('rain') !== -1" />
                                    </template>
                                </div>
                                <div>{{ item.data.instant.details.air_temperature }}°</div>
                            </template>
                        </div>
                    </div>
                </div>
                <!-- #endregion 小时预报 -->
                <!-- #region 10日天气预报 -->
                <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                    <div class="text-xs text-foreground/50 flex flex-row mb-2">
                        <CalendarDays color="#ccc" :size="16" />
                        <span>10日天气预报</span>
                    </div>
                    <div class="flex flex-col">
                        <div class="flex flex-row  justify-between text-xs p-3 border-t-1 border-foreground/20"
                            v-for="i in 1" :key="i">
                            <div class="w-1/5 items-center flex">今天</div>
                            <div class="w-1/5">
                                <div>
                                    <CloudHail :size="16" />
                                </div>
                                <div class="text-xs">80%</div>
                            </div>
                            <div class="flex-1 flex-row flex items-center justify-center">
                                <span class="text-foreground/70">30°</span>
                                <Progress v-model="progress" class="w-3/5  mx-2" />
                                <span>30°</span>
                            </div>
                        </div>
                        <div class="flex flex-row  justify-between text-xs p-3 border-t-1 border-foreground/20"
                            v-for="i in 1" :key="i">
                            <div class="w-1/5 items-center flex">今天</div>
                            <div class="w-1/5">
                                <div>
                                    <Cloud :size="16" />
                                </div>
                            </div>
                            <div class="flex-1 flex-row flex items-center justify-center">
                                <span class="text-foreground/70">30°</span>
                                <Progress v-model="progress" class="w-3/5  mx-2" />
                                <span>30°</span>
                            </div>
                        </div>
                        <div class="flex flex-row  justify-between text-xs p-3 border-t-1 border-foreground/20"
                            v-for="i in 1" :key="i">
                            <div class="w-1/5 items-center flex">今天</div>
                            <div class="w-1/5">
                                <div>
                                    <Sun color="yellow" :size="16" />
                                </div>
                            </div>
                            <div class="flex-1 flex-row flex items-center justify-center">
                                <span class="text-foreground/70">30°</span>
                                <Progress v-model="progress" class="w-3/5  mx-2" />
                                <span>30°</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- #endregion 10日天气预报 -->
                <!-- #region 空气质量地图 -->
                <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                    <div class="text-xs text-foreground/50 flex flex-row mb-2">
                        <Table color="#ccc" :size="16" />
                        <span>空气质量地图</span>
                    </div>
                    <div>地图</div>
                </div>
                <!-- #endregion 空气质量地图 -->
                <!-- #region 天气警报 -->
                <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                    <div class="text-xs text-foreground/50 flex flex-row mb-2">
                        <TriangleAlert color="#ccc" :size="16" />
                        <span>天气警报</span>
                    </div>
                    <div class="font-lg">强对流
                    </div>
                    <div>警报生成中：强对流</div>
                    <div class="text-foreground/50 text-xs">国家预警信息发布中心</div>
                </div>
                <!-- #endregion 天气警报 -->
                <!-- #region 体感温度+紫外线指数 -->
                <div class="mt-2 flex flex-row justify-between gap-2">
                    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                        <div>
                            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                                <ThermometerSun color="#ccc" :size="16" />
                                <span>体感温度</span>
                            </div>
                            <div class="text-lg">25°</div>
                        </div>
                        <p class="text-xs">与实际温度相似</p>
                    </div>
                    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20 ">
                        <div>
                            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                                <Sun color="#ccc" :size="16" />
                                <span>紫外线指数</span>
                            </div>
                            <div class="text-lg">5</div>
                            <div>中等</div>
                        </div>
                        <div>
                            <Progress v-model="progress" class="w-full my-2" />
                            <p class="text-xs">17:00前注意防晒。</p>
                        </div>
                    </div>
                </div>
                <!-- #endregion 体感温度+紫外线指数 -->
                <!-- #region 风 -->
                <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                    <div class="text-xs text-foreground/50 flex flex-row mb-2">
                        <Wind color="#ccc" :size="16" />
                        <span>风</span>
                    </div>
                    <div class="text-xs flex justify-between flex-row gap-2">
                        <div class="w-3/5">
                            <div class="py-2 flex flex-row justify-between border-b-1 border-foreground/50">
                                <span>风力</span>
                                <span class="text-foreground/50">2级</span>
                            </div>
                            <div class="py-2 flex flex-row justify-between border-b-1 border-foreground/50">
                                <span>阵风</span>
                                <span class="text-foreground/50">4米/秒</span>
                            </div>
                            <div class="py-2 flex flex-row justify-between">
                                <span>方向</span>
                                <span class="text-foreground/50">南风180°</span>
                            </div>

                        </div>
                        <div>风的图片</div>

                    </div>
                </div>
                <!-- #endregion 风 -->

                <!-- #region 日落+降水 -->
                <div class="mt-2 flex flex-row justify-between gap-2">
                    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                        <div>
                            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                                <Sunset color="#ccc" :size="16" />
                                <span>日落</span>
                            </div>
                            <div class="text-lg">19:14</div>
                        </div>
                        <p>日落图</p>
                        <p class="text-xs">日出：05:17</p>
                    </div>
                    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20 ">
                        <div>
                            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                                <Droplet color="#ccc" :size="16" />
                                <span>降水</span>
                            </div>
                            <div class="text-lg">2毫米</div>
                            <div>今天</div>
                        </div>
                        <div>
                            <p class="text-xs">预计接下来的周六会有73毫米</p>
                        </div>
                    </div>
                </div>
                <!-- #endregion 日落+降水 -->
                <!-- #region 能见度+湿度 -->
                <div class="mt-2 flex flex-row justify-between gap-2">
                    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                        <div>
                            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                                <Eye color="#ccc" :size="16" />
                                <span>能见度</span>
                            </div>
                            <div class="text-lg">19公里</div>
                        </div>
                        <p class="text-xs">视野非常好</p>
                    </div>
                    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20 ">
                        <div>
                            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                                <Waves color="#ccc" :size="16" />
                                <span>湿度</span>
                            </div>
                            <div class="text-lg">77%</div>
                        </div>
                        <div>
                            <p class="text-xs">目前露点温度为18°。</p>
                        </div>
                    </div>
                </div>
                <!-- #endregion 能见度+湿度 -->

                <!-- #region 月 -->
                <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                    <div class="text-xs text-foreground/50 flex flex-row mb-2">
                        <Eclipse color="#ccc" :size="16" />
                        <span>蛾眉月</span>
                    </div>
                    <div class="text-xs flex justify-between flex-row gap-2">
                        <div class="w-3/5">
                            <div class="py-2 flex flex-row justify-between border-b-1 border-foreground/50">
                                <span>照射范围</span>
                                <span class="text-foreground/50">2%</span>
                            </div>
                            <div class="py-2 flex flex-row justify-between border-b-1 border-foreground/50">
                                <span>月落</span>
                                <span class="text-foreground/50">20:53</span>
                            </div>
                            <div class="py-2 flex flex-row justify-between">
                                <span>下次满月</span>
                                <span class="text-foreground/50">14天</span>
                            </div>

                        </div>
                        <div>月的图片</div>
                    </div>
                </div>
                <!-- #endregion 月 -->

                <!-- #region 平均+气压 -->
                <div class="mt-2 flex flex-row justify-between gap-2">
                    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20">
                        <div>
                            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                                <ChartLine color="#ccc" :size="16" />
                                <span>平均</span>
                            </div>
                            <div class="text-lg">-3°</div>
                            <p class="text-xs">低于日均最高温</p>
                        </div>
                        <div>
                            <div class="flex flex-row justify-between">
                                <span class="text-foreground/50">今天</span>
                                <span>最高24°</span>
                            </div>
                            <div class="flex flex-row justify-between">
                                <span class="text-foreground/50">平均值</span>
                                <span>最高27°</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20 ">
                        <div>
                            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                                <CircleGauge color="#ccc" :size="16" />
                                <span>气压</span>
                            </div>
                        </div>
                        <div>
                            气压图
                        </div>
                    </div>
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