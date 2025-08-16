<script setup lang='ts'>
import { DAYMAP } from '@/constants/date';
import { RAINODDS } from '@/constants/weather';
import { isTodayLocal } from '@/utils/date';
import { CalendarDays, Cloud, CloudHail, Sun } from 'lucide-vue-next';
import { ref } from 'vue';
import Progress from '@/components/ui/progress/Progress.vue';

defineProps(['day10Data'])
const progress = ref(13)
</script>
<template>
    <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div class="text-xs text-foreground/50 flex flex-row mb-2">
            <CalendarDays color="#ccc" :size="16" />
            <span>10日天气预报</span>
        </div>
        <div class="flex flex-col">
            <div class="flex flex-row  justify-between text-xs p-3 border-t-1 border-foreground/20"
                v-for="(value, key) in day10Data" :key="key">
                <div class="w-1/5 items-center flex">{{ isTodayLocal(value.time) ? '今天' : '周' +
                    DAYMAP.get(new
                        Date(value.time).getDay()) }}</div>
                <div class="w-1/5">
                    <template v-if="value.data.next_1_hours && value.data.next_1_hours.summary.symbol_code">
                        <Cloud v-if="value.data.next_1_hours.summary.symbol_code.search('cloudy') !== -1" />
                        <CloudHail v-else-if="value.data.next_1_hours.summary.symbol_code.search('rain') !== -1" />
                        <Sun color="yellow" v-else />
                        <div class="text-xs" v-if="RAINODDS.has(value.data.next_1_hours.summary.symbol_code)">
                            {{ RAINODDS.get(value.data.next_1_hours.summary.symbol_code) }}%
                        </div>
                    </template>
                    <template v-else-if="value.data.next_6_hours && value.data.next_6_hours.summary.symbol_code">
                        <Cloud v-if="value.data.next_6_hours.summary.symbol_code.search('cloudy') !== -1" />
                        <CloudHail v-else-if="value.data.next_6_hours.summary.symbol_code.search('rain') !== -1" />
                        <Sun color="yellow" v-else />
                        <div class="text-xs" v-if="RAINODDS.has(value.data.next_6_hours.summary.symbol_code)">
                            {{ RAINODDS.get(value.data.next_6_hours.summary.symbol_code) }}%
                        </div>
                    </template>
                    <template v-else-if="value.data.next_12_hours && value.data.next_12_hours.summary.symbol_code">
                        <Cloud v-if="value.data.next_12_hours.summary.symbol_code.search('cloudy') !== -1" />
                        <CloudHail v-else-if="value.data.next_12_hours.summary.symbol_code.search('rain') !== -1" />
                        <Sun color="yellow" v-else />
                        <div class="text-xs" v-if="RAINODDS.has(value.data.next_12_hours.summary.symbol_code)">
                            {{ RAINODDS.get(value.data.next_12_hours.summary.symbol_code) }}%
                        </div>
                    </template>
                </div>
                <div class="flex-1 flex-row flex items-center justify-center">
                    <span class="text-foreground/70">{{ value.data.instant.details.air_temperature
                        }}°</span>
                    <Progress v-model="progress" class="w-3/5  mx-2" />
                    <span>{{ value.data.instant.details.air_temperature }}°</span>
                </div>
            </div>
        </div>
    </div>
</template>