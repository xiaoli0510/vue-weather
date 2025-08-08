<script setup lang='ts'>
import "leaflet/dist/leaflet.css";
import { Table } from 'lucide-vue-next';
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
defineOptions({
    name: 'AirQualityMapCom'
})
const props = defineProps(['airData'])


const mapContainer = ref()

onMounted(() => {
    const map = L.map(mapContainer.value).setView([22.5431, 114.0579], 10)
    // 方法1：更换瓦片源（推荐使用国内源）
    L.tileLayer('https://webst01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}', {
        subdomains: ['1', '2', '3', '4'],
        attribution: '© 高德地图'
    }).addTo(map)

    const createCircleMarker = (lat: number, lng: number, text: string) => {
        const circleIcon = L.divIcon({
            html: `<div class="text-center"><span class="inline-block bg-black font-white border-1 border-green-600 w-8 h-8 rounded-full text-lg">${text}</span><br/><span class="font-white my-location text-xs">我的位置</span></div>`,
            className: 'custom-circle-icon',
            iconSize: [100, 100],
            iconAnchor: [50, 50]
        })
        return L.marker([lat, lng], { icon: circleIcon }).addTo(map)
    }

    createCircleMarker(22.5431, 114.0579, props.airData.list[0].main.aqi)

    // 错误处理
    map.on('tileerror', (e) => {
        console.error('瓦片加载失败:', e.tile.src)
        // 可以在这里显示备用瓦片或错误提示
    })
})
</script>
<template>
    <div class="mt-2 w-full rounded-lg p-2 text-sm  bg-foreground/20">
        <div class="text-xs text-foreground/50 flex flex-row mb-2">
            <Table color="#ccc" :size="16" />
            <span>空气质量地图</span>
        </div>
        <div>
            <div ref="mapContainer" class="map" style="height:300px; width:400px"></div>
        </div>
    </div>
</template>
<style scoped>
:deep(.my-location) {
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
    /* 黑色文字描边 */
}
</style>