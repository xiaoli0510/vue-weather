<script setup lang='ts'>
import { Sun } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import Progress from './ui/progress/Progress.vue';
import { apiGetIndex } from '@/apis/weather';

defineOptions({
    name: 'RaysCom'
})

const indexData = ref<{ fxLink: string, daily: Array<{ level: string; category: string }> }>({
    fxLink: '',
    daily: [{ level: '', category: '' }]
})
const getIndexData = () => {
    apiGetIndex().then(res => {
        indexData.value = res.data
    })
}

onMounted(() => {
    getIndexData()
})

const progress = ref(3)
</script>
<template>
    <a target="_blank" :href="indexData.fxLink"
        class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20 ">
        <div>
            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                <Sun color="#ccc" :size="16" />
                <span>紫外线指数</span>
            </div>
            <div class="text-lg">{{ indexData.daily[0].level }}</div>
            <div>{{ indexData.daily[0].category }}</div>
        </div>
        <div>
            <Progress v-model="progress" class="w-full my-2" />
            <p class="text-xs">17:00前注意防晒。</p>
        </div>
    </a>
</template>