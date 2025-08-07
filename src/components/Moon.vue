<script setup lang='ts'>
import type { IResMoon, IResMoonPhase } from '@/apis/model/moon';
import { apiGetMoon } from '@/apis/weather';
import { Eclipse } from 'lucide-vue-next';
import { ref } from 'vue';
import { onMounted } from 'vue';
defineOptions({
    name: 'MoonCom'
})

const moonData = ref<IResMoon<IResMoonPhase>>()
const getMoonData = async () => {
    const res = await apiGetMoon()
    moonData.value = res.data
}

onMounted(async () => {
    await getMoonData()
})

</script>
<template>
    <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20" v-if="moonData">
        <div class="text-xs text-foreground/50 flex flex-row mb-2">
            <Eclipse color="#ccc" :size="16" />
            <span>{{ moonData!.moonPhase[0].name }}</span>
        </div>
        <div class="text-xs flex justify-between flex-row gap-2">
            <div class="w-3/5">
                <div class="py-2 flex flex-row justify-between border-b-1 border-foreground/50">
                    <span>照射范围</span>
                    <span class="text-foreground/50">{{ moonData!.moonPhase[0].illumination }}%</span>
                </div>
                <div class="py-2 flex flex-row justify-between border-b-1 border-foreground/50">
                    <span>月落</span>
                    <span class="text-foreground/50">{{ new
                        Date(moonData!.moonset).toLocaleTimeString('it-IT') }}</span>
                </div>
                <div class="py-2 flex flex-row justify-between">
                    <span>下次满月</span>
                    <span class="text-foreground/50">{{ Math.round((1 - Number(moonData!.moonPhase[0].value)) * 29.53)
                    }}天</span>
                </div>
            </div>
            <div>月的图片</div>
        </div>
    </div>
</template>