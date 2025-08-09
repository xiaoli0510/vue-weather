<script setup lang='ts'>
import { calculateDewPoint } from '@/utils/weather';
import { Waves } from 'lucide-vue-next';
defineOptions({
    name: 'DewCom'
})

defineProps(['curData'])
</script>
<template>
    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20" v-if="curData">
        <div>
            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                <Waves color="#ccc" :size="16" />
                <span>湿度</span>
            </div>
            <div class="text-lg">{{ curData.main.humidity }}%</div>
        </div>
        <div>
            <p class="text-xs">目前露点温度为{{ calculateDewPoint((curData.main.temp - 32) * 5 / 9,
                87).toFixed(1) }}°。</p>
        </div>
    </div>
</template>