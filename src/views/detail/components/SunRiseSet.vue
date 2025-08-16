<script setup lang='ts'>
import { formateSecond } from '@/utils/weather';
import { Sunset } from 'lucide-vue-next';
defineOptions({
    name: 'SunRiseSetCom'
})
defineProps(['curData'])

</script>
<template>
    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div>
            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                <Sunset color="#ccc" :size="16" />
                <span>日落</span>
            </div>
            <div class="text-lg" v-if="curData">{{ formateSecond(curData.sys.sunset) }}</div>
        </div>
        <p>日落图</p>
        <p class="text-xs" v-if="curData">日出：{{ formateSecond(curData.sys.sunrise) }}</p>
    </div>
</template>