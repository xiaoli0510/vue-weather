<script setup lang='ts'>
import { Eye } from 'lucide-vue-next';
defineOptions({
    name: 'VisibilityCom'
})
defineProps(['curData'])
</script>
<template>
    <div class="flex justify-between flex-col h-32 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div>
            <div class="text-xs text-foreground/50 flex flex-row mb-2">
                <Eye color="#ccc" :size="16" />
                <span>能见度</span>
            </div>
            <div class="text-lg">{{ curData.visibility / 1000 }}公里</div>
        </div>
        <p class="text-xs">视野<template v-if="curData.visibility / 1000 >= 10">非常好</template><template
                v-else-if="curData.visibility / 1000 >= 5">一般</template><template v-else>非常差</template>
        </p>
    </div>
</template>