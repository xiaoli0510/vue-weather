<script setup lang='ts'>
import { CircleGauge } from 'lucide-vue-next';
import { onMounted } from 'vue';

defineOptions({
    name: 'PressCom'
})
</script>
<template>
    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20 ">
        <div>
            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                <CircleGauge color="#ccc" :size="16" />
                <span>气压</span>
            </div>
        </div>
        <div>
        </div>
    </div>
</template>