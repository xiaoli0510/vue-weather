<script setup lang='ts'>
import { Eclipse } from 'lucide-vue-next';
defineOptions({
    name: 'MoonCom'
})

defineProps(['moonData'])

</script>
<template>
    <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div class="text-xs text-foreground/50 flex flex-row mb-2">
            <Eclipse color="#ccc" :size="16" />
            <span>{{ moonData.moonPhase[0].name }}</span>
        </div>
        <div class="text-xs flex justify-between flex-row gap-2">
            <div class="w-3/5">
                <div class="py-2 flex flex-row justify-between border-b-1 border-foreground/50">
                    <span>照射范围</span>
                    <span class="text-foreground/50">{{ moonData.moonPhase[0].illumination }}%</span>
                </div>
                <div class="py-2 flex flex-row justify-between border-b-1 border-foreground/50">
                    <span>月落</span>
                    <span class="text-foreground/50">{{ new
                        Date(moonData.moonPhase[0].fxTime).toLocaleTimeString('it-IT') }}</span>
                </div>
                <div class="py-2 flex flex-row justify-between">
                    <span>下次满月</span>
                    <span class="text-foreground/50">14天</span>
                </div>

            </div>
            <div>月的图片</div>
        </div>
    </div>
</template>