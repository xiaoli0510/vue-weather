<script setup lang='ts'>
import { ref } from 'vue';
import Progress from './ui/progress/Progress.vue';
defineOptions({
    name: 'AirCom'
})

defineProps(['airData'])
const progress = ref(13)

</script>
<template>
    <div v-if="airData" class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div>{{ airData.list[0].main.aqi }}-{{ airData.list[0].main.aqi >= 8 ? '优' :
            airData.list[0].main.aqi
                >= 6 ? '良' : '中' }}</div>
        <div class="my-2">
            <Progress v-model="progress" class="w-full" />
        </div>
        <div class="text-xs">当前AQI(CN)为{{ airData.list[0].main.aqi }}</div>
    </div>
</template>