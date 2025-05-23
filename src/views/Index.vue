<script setup lang='ts'>
import { Input } from '@/components/ui/input'
import { Mic, Search } from 'lucide-vue-next';
import { ref } from 'vue';

defineOptions({
    name: 'HomeView'
})
</script>
<template>
    <h3>天气</h3>
    <div class="relative w-full max-w-sm items-center">
        <Input id="search" type="text" placeholder="搜索城市或机场" class="pl-6" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="text-muted-foreground" :size="14" />
        </span>
        <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
            <Mic class="text-muted-foreground" :size="14" />
        </span>
    </div>
</template>