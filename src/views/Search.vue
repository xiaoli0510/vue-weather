<script setup lang='ts'>
import Input from '@/components/ui/input/Input.vue';
import { Search, Mic, CircleX } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import Card from '@/components/Card.vue';
import { cityEn } from '@/data/en.city'

defineOptions({
    name: 'SearchView'
})

const history = ref([
    {
        name: 'Shenzhen',
    },
    {
        name: 'Shanghai',
    }
]);
const provinceName = ref('')
const curCityObj = ref({})
//搜索防抖
const searchData = (val: string) => {
    curCityObj.value = {}
    const province: { [key: string]: string } = cityEn[0];
    const regex = new RegExp(val, 'i')
    for (const key in province) {
        const provinceKey = province[key]
        if (regex.test(provinceKey)) {
            Object.assign(curCityObj.value, cityEn[key])
        }
    }
}
let searchTimer: number;
const debounceSearch = (query: string) => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
        if (!query.trim()) return
        searchData(query)
    }, 500)
}
watch(() => provinceName.value, (newVal) => {
    debounceSearch(newVal)
})
const clear = () => {
    provinceName.value = ''
    curCityObj.value = {}
}

const showCard = ref(false)
const city = ref('')
const openCard = (name: string) => {
    showCard.value = true
    city.value = name
}

const closeCard = () => {
    showCard.value = false
}
</script>
<template>
    <div class="main bg-background h-full relative ">
        <div class="flex p-4">
            <div class="flex-1 relative items-center bg-foreground/40 rounded-lg text-foreground">
                <Input id="search" type="text" placeholder="search province" class="pl-6 text-foreground"
                    v-model="provinceName" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <Search class="text-foreground" :size="14" />
                </span>
                <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                    <CircleX class="text-foreground" :size="14" v-if="provinceName" @click="clear" />
                    <Mic class="text-foreground" :size="14" v-else />
                </span>
            </div>
            <div class="w-10 text-foreground text-center leading-7" @click="$router.push('/')">取消</div>
        </div>
        <div v-if="!provinceName" class="px-4">
            <div class="mt-2 text-muted-foreground text-xs">建议</div>
            <div class="history flex flex-col gap-2 text-foreground text-sm mt-1">
                <div v-for="(item, index) in history" :key="index" @click="openCard(item.name)">
                    <div>{{ item.name }}</div>
                </div>
            </div>
        </div>
        <div v-else style="height:calc(100% - 70px)" class="overflow-y-auto border-1 px-4">
            <div class="mt-1 text-foreground" v-for="(value, key) in curCityObj" :key="key" @click="openCard(value)">{{
                value }}</div>
        </div>
        <Card :show="showCard" @close="closeCard" :city="city" />
    </div>
</template>