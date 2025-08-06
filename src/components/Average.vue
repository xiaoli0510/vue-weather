<script setup lang='ts'>
import { ChartLine } from 'lucide-vue-next';

defineOptions({
    name: 'AverageCom'
})
</script>
<template>
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
</template>