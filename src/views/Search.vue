<script setup lang='ts'>
import Input from '@/components/ui/input/Input.vue';
import { Search, Mic } from 'lucide-vue-next';


defineOptions({
    name: 'SearchView'
})
</script>
<template>
    <div class="main bg-background p-4 h-full">
        <div class="flex">
            <div class="flex-1 relative items-center bg-foreground/70 rounded-lg text-foreground">
                <Input id="search" type="text" placeholder="搜索城市或机场" class="pl-6 text-foreground" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <Search class="text-foreground" :size="14" />
                </span>
                <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                    <Mic class="text-foreground" :size="14" />
                </span>
            </div>
            <div class="w-24">取消</div>
        </div>
    </div>
</template>