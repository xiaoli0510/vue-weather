<script setup lang='ts'>
import { fahrenheitToCelsius } from '@/utils/weather';
import { ChartLine } from 'lucide-vue-next';

defineOptions({
    name: 'AverageCom'
})

defineProps(['curData'])
</script>
<template>
    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div>
            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                <ChartLine color="#ccc" :size="16" />
                <span>平均</span>
            </div>
            <div class="text-lg">{{ fahrenheitToCelsius(curData.main.temp) - fahrenheitToCelsius(curData.main.temp_max)
                }}°</div>
            <p class="text-xs">
                <template v-if="curData.main.temp < curData.main.temp_max">低</template>
                <template v-else-if="curData.main.temp > curData.main.temp_max">高</template>
                <template v-if="curData.main.temp === curData.main.temp_max">相等</template>于日均最高温
            </p>
        </div>
        <div>
            <div class="flex flex-row justify-between">
                <span class="text-foreground/50">今天</span>
                <span>最高{{ fahrenheitToCelsius(curData.main.temp_max) }}°</span>
            </div>
            <div class="flex flex-row justify-between">
                <span class="text-foreground/50">平均值</span>
                <span>最高{{ fahrenheitToCelsius(curData.main.temp) }}°</span>
            </div>
        </div>
    </div>
</template>