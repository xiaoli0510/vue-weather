<script setup lang='ts'>
import { Cloud, CloudHail, Sun } from 'lucide-vue-next';

defineProps(['nextRainWind', 'hour24Data'])

</script>
<template>
    <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div class="text-xs border-b-1 border-foreground/20 leading-9" v-if="nextRainWind">
            {{ new Date(nextRainWind!.time).getHours() }}时左右预计有雨。阵风风速最高{{
                nextRainWind?.data.instant.details.wind_speed }}米/秒。
        </div>
        <div class="flex overflow-x-auto" v-if="hour24Data">
            <div class="text-xs p-1 mr-6 text-center  whitespace-nowrap" v-for="(item, index) in hour24Data"
                :key="index">
                <div>{{ new Date(item.time).getHours() === new Date().getHours() ? '现在' : new
                    Date(item.time).getHours() + '时' }}</div>
                <div>
                    <template v-if="item.data.next_1_hours && item.data.next_1_hours.summary">
                        <Cloud v-if="item.data.next_1_hours.summary.symbol_code.search('cloudy') !== -1" />
                        <CloudHail v-else-if="item.data.next_1_hours.summary.symbol_code.search('rain') !== -1" />
                        <Sun color="yellow" v-else />
                    </template>
                </div>
                <div>{{ item.data.instant.details.air_temperature }}°</div>
            </div>
        </div>
    </div>
</template>