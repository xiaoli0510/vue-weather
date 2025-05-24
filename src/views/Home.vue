<script setup lang='ts'>
import { Input } from '@/components/ui/input'
import { Columns3Cog, Mic, Moon, Search, Sun } from 'lucide-vue-next';
import { useColorMode } from '@vueuse/core'
import OpenWeatherMap from 'openweathermap-ts';
import { ref } from 'vue';
import type { CurrentResponse } from 'openweathermap-ts/dist/types';

defineOptions({
    name: 'HomeView'
})

const mode = useColorMode()
mode.value = 'dark'


const openWeather = new OpenWeatherMap({
    apiKey: '03529234da0b399e8332896853683dc1'
});

const list = ref<CurrentResponse[]>([])

const curCity = 'Shenzhen'

const cityList = [
    'Shenzhen',
    'Wuhan',
    'Dunhuang'
]

const getAllCityWeather = async () => {
    const promises = cityList.map((city) => {
        return openWeather.getCurrentWeatherByCityName({
            cityName: city
        }).catch(error => {
            console.log(error);
        })
    })
    const results = await Promise.all(promises)
    //按照cityList的顺序进行升序排序
    list.value = results.filter((item): item is CurrentResponse => item !== null).sort(
        (a, b) => {
            return cityList.indexOf(a.name) - cityList.indexOf(b.name)
        }
    );
}
getAllCityWeather()

</script>
<template>
    <div class="main bg-background p-4 h-full">
        <div class="relative mb-1">
            <h3 class="text-foreground text-2xl">天气</h3>
            <Moon color="#000" :size="16" class="absolute right-0 top-0" v-if="mode === 'light'"
                @click="mode = 'dark'" />
            <Sun color="#fff" :size="16" class="absolute right-0 top-0" v-if="mode === 'dark'"
                @click="mode = 'light'" />
        </div>
        <div class="relative w-full max-w-sm items-center bg-foreground/70 rounded-lg text-foreground">
            <Input id="search" type="text" placeholder="搜索城市或机场" class="pl-6 text-foreground" />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <Search class="text-foreground" :size="14" />
            </span>
            <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                <Mic class="text-foreground" :size="14" />
            </span>
        </div>
        <div class="flex flex-col gap-2 mt-4">
            <div class="rounded-lg p-2 bg-gray-300 text-foreground shadow-md" v-for="item in list" :key="item.id">
                <div class="flex flex-row justify-between items-center">
                    <div>
                        <div class="text-foreground/80">{{ item.name }}</div>
                        <div class="text-xs font-bold" v-if="curCity === item.name">我的位置</div>
                    </div>
                    <div class="text-3xl">{{ Math.round((item.main.temp - 32) / 1.8) }}℃</div>
                </div>
                <div class="flex flex-row justify-between mt-7">
                    <div class="text-xs">{{ item.weather[0].main }}</div>
                    <div>
                        <span class="text-xs vertical-text">最高</span>
                        <span class="text-lg">{{ Math.round((item.main.temp_max - 32) / 1.8) }}℃</span>
                        <span class="text-xs vertical-text ml-1">最低</span>
                        <span class="text-lg">{{ Math.round((item.main.temp_min - 32) / 1.8) }}℃</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: upright;
}
</style>