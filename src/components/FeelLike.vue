<script setup lang='ts'>
import { fahrenheitToCelsius } from '@/utils/weather';
import { ThermometerSun } from 'lucide-vue-next';
defineOptions({
    name: 'FeelLikeCom'
})

defineProps(['curData'])
</script>
<template>
    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div v-if="curData">
            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                <ThermometerSun color="#ccc" :size="16" />
                <span>体感温度</span>
            </div>
            <div class="text-lg">{{ fahrenheitToCelsius(curData.main.feels_like) }}°</div>
        </div>
        <p class="text-xs" v-if="curData">体感温度{{ curData.main.feels_like >
            curData.main.temp ? '更高' : curData.main.feels_like < curData.main.temp ? '更低' : '相近' }}</p>
    </div>
</template>