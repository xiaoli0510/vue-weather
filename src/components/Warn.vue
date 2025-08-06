<script setup lang='ts'>
import { TriangleAlert } from 'lucide-vue-next';

defineOptions({
    name: 'WarnCom'
})
defineProps(['warnData'])
</script>
<template>
    <a v-if="warnData.warning.length > 0" :href="warnData.fxLink" target="_blank"
        class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div class="text-xs text-foreground/50 flex flex-row mb-2">
            <TriangleAlert color="#ccc" :size="16" />
            <span>天气警报</span>
        </div>
        <div class="font-lg">
            <span>{{ warnData.warning[0].typeName }}及其他{{ warnData.warning.length - 1 }}则</span>
        </div>
        <div>警报生效中：<span v-for="(item, index) in warnData.warning" :key="index">{{ item.typeName }},</span>
        </div>
        <div class="text-foreground/50 text-xs">{{ warnData.refer
            .sources[0] }}</div>
    </a>
</template>