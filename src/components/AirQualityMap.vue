<script setup lang='ts'>
import "leaflet/dist/leaflet.css";
import { Table } from 'lucide-vue-next';
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
defineOptions({
    name: 'AirQualityMapCom'
})


const mapContainer = ref()

onMounted(() => {
    const map = L.map(mapContainer.value).setView([22.5431, 114.0579], 12)
    // 方法1：更换瓦片源（推荐使用国内源）
    L.tileLayer('https://webst01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}', {
        subdomains: ['1', '2', '3', '4'],
        attribution: '© 高德地图'
    }).addTo(map).bindPopup('我的位置').openPopup();

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