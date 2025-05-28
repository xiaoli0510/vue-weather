<script setup lang='ts'>
import { Progress } from '@/components/ui/progress'
import { CalendarDays, Cloud, CloudHail, Sun, Table, ThermometerSun, TriangleAlert } from 'lucide-vue-next';
import { ref } from 'vue';
defineOptions({
    name: 'CardCom'
})
const progress = ref(13)
</script>
<template>
    <div class="rounded-t-lg p-4 text-foreground border-1 h-full overflow-y-auto">
        <div class="flex text-xs justify-between">
            <div>取消</div>
            <div>添加</div>
        </div>
        <div class="my-6 text-center">
            <div class="text-lg">海口市</div>
            <div class="text-5xl mt-1">30℃</div>
            <div>
                <span class="text-xs vertical-text">最高</span>
                <span class="text-3xl">30℃</span>
                <span class="text-xs vertical-text ml-1">最低</span>
                <span class="text-3xl">30℃</span>
            </div>
            <div>局地雷暴雨</div>
        </div>
        <div class="flex flex-col">
            <!-- #region 空气质量指数 -->
            <div class="mt-2 w-full rounded-lg p-4 text-sm  bg-foreground/20">
                <div>27-优</div>
                <div class="my-2">
                    <Progress v-model="progress" class="w-full" />
                </div>
                <div class="text-xs">当前AQI(CN)为27</div>
            </div>
            <!-- #endregion 空气质量指数 -->
            <!-- #region 小时预报 -->
            <div class="mt-2 w-full rounded-lg p-4 text-sm  bg-foreground/20">
                <div class="text-xs border-b-1 border-foreground/20 leading-9">17:00左右预计有雨。阵风风速最高5米/秒。</div>
                <div class="flex overflow-x-auto">
                    <div class="text-xs p-3 text-center" v-for="i in 10" :key="i">
                        <div>现在</div>
                        <div>
                            <CloudHail :size="16" />
                        </div>
                        <div>30℃</div>
                    </div>
                </div>
            </div>
            <!-- #endregion 小时预报 -->
            <!-- #region 10日天气预报 -->
            <div class="mt-2 w-full rounded-lg p-4 text-sm  bg-foreground/20">
                <div class="text-xs text-foreground/50 flex flex-row mb-2">
                    <CalendarDays color="#ccc" :size="16" />
                    <span>10日天气预报</span>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-row  justify-between text-xs p-3 border-t-1 border-foreground/20"
                        v-for="i in 1" :key="i">
                        <div class="w-1/5 items-center flex">今天</div>
                        <div class="w-1/5">
                            <div>
                                <CloudHail :size="16" />
                            </div>
                            <div class="text-xs">80%</div>
                        </div>
                        <div class="flex-1 flex-row flex items-center justify-center">
                            <span class="text-foreground/70">30℃</span>
                            <Progress v-model="progress" class="w-3/5  mx-2" />
                            <span>30℃</span>
                        </div>
                    </div>
                    <div class="flex flex-row  justify-between text-xs p-3 border-t-1 border-foreground/20"
                        v-for="i in 1" :key="i">
                        <div class="w-1/5 items-center flex">今天</div>
                        <div class="w-1/5">
                            <div>
                                <Cloud :size="16" />
                            </div>
                            <div class="text-xs">80%</div>
                        </div>
                        <div class="flex-1 flex-row flex items-center justify-center">
                            <span class="text-foreground/70">30℃</span>
                            <Progress v-model="progress" class="w-3/5  mx-2" />
                            <span>30℃</span>
                        </div>
                    </div>
                    <div class="flex flex-row  justify-between text-xs p-3 border-t-1 border-foreground/20"
                        v-for="i in 1" :key="i">
                        <div class="w-1/5 items-center flex">今天</div>
                        <div class="w-1/5">
                            <div>
                                <Sun color="yellow" :size="16" />
                            </div>
                            <div class="text-xs">80%</div>
                        </div>
                        <div class="flex-1 flex-row flex items-center justify-center">
                            <span class="text-foreground/70">30℃</span>
                            <Progress v-model="progress" class="w-3/5  mx-2" />
                            <span>30℃</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #endregion 10日天气预报 -->
            <!-- #region 空气质量地图 -->
            <div class="mt-2 w-full rounded-lg p-4 text-sm  bg-foreground/20">
                <div class="text-xs text-foreground/50 flex flex-row mb-2">
                    <Table color="#ccc" :size="16" />
                    <span>空气质量地图</span>
                </div>
                <div>地图</div>
            </div>
            <!-- #endregion 空气质量地图 -->
            <!-- #region 天气警报 -->
            <div class="mt-2 w-full rounded-lg p-4 text-sm  bg-foreground/20">
                <div class="text-xs text-foreground/50 flex flex-row mb-2">
                    <TriangleAlert color="#ccc" :size="16" />
                    <span>天气警报</span>
                </div>
                <div class="font-lg">强对流
                </div>
                <div>警报生成中：强对流</div>
                <div class="text-foreground/50 text-xs">国家预警信息发布中心</div>
            </div>
            <!-- #endregion 天气警报 -->
            <!-- #region 体感温度+紫外线指数 -->
            <div class="mt-2 w-full rounded-lg p-4 text-sm  bg-foreground/20">
                <div class="h-32">
                    <div class="text-xs text-foreground/50 flex flex-row mb-2">
                        <ThermometerSun color="#ccc" :size="16" />
                        <span>体感温度</span>
                    </div>
                    <div>25℃</div>
                    <p class="xs">与实际温度相似</p>
                </div>
                <div class="h-32">
                    <div class="text-xs text-foreground/50 flex flex-row mb-2">
                        <Sun color="#ccc" :size="16" />
                        <span>紫外线指数</span>
                    </div>
                    <div>5</div>
                    <div>中等</div>
                    <p class="xs">17:00前注意防晒。</p>
                </div>

            </div>
            <!-- #endregion 体感温度+紫外线指数 -->

        </div>

    </div>
</template>