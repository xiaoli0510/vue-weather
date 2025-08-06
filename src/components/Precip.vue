<script setup lang='ts'>
import { Droplet } from 'lucide-vue-next';

defineOptions({
    name: 'PrecipCom'
})
defineProps(['hour24Data', 'nextRainInfo'])
</script>
<template>
    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20 ">
        <div>
            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                <Droplet color="#ccc" :size="16" />
                <span>降水</span>
            </div>
            <div class="text-lg">{{ hour24Data[0].data.next_1_hours.details.precipitation_amount }}毫米
            </div>
            <div>今天</div>
        </div>
        <div>
            <p class="text-xs">预计接下来的{{ new Date(nextRainInfo!.time
            ).toLocaleTimeString('it-IT') }}时会有{{
                    nextRainInfo?.data.next_1_hours.details.precipitation_amount }}毫米</p>
        </div>
    </div>
</template>