<script setup lang='ts'>
import { useFollowStore } from '@/store/follow';
import { useCurCityStore } from '@/store/curCity';
import Index from '../Index.vue';
defineOptions({
    name: 'CardCom'
})
const emits = defineEmits([
    'close'
])
defineProps(['show'])

const close = () => {
    emits('close')
}

const { add } = useFollowStore()
const { city } = useCurCityStore()
const addCity = () => {
    add(city!.name)
}
</script>
<template>
    <div class="absolute bottom-0 left-0 w-full bg-gray-400 rounded-t-lg overflow-y-auto p-4 text-white"
        style="height:calc(100%  - 10px)">
        <div class="flex text-xs justify-between">
            <div @click="close">取消</div>
            <div @click="addCity">添加</div>
        </div>
        <Index />
    </div>
</template>