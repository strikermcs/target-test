<script setup lang="ts">
import type { IArea } from '~/types';

interface Props {
    area: IArea
}

defineProps<Props>()
</script>

<template>
    <div class="p-6 bg-gray-300 min-w-[300px] rounded">
        <div class="flex items-center gap-3 mb-3">
            <div>
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"/>
                 </svg>
            </div>
            <div class=" font-bold">
                Target
            </div>
        </div>
        <div class="flex flex-col h-[90%] justify-between">
            <ul>
                <li
                    v-for="target in area.targets"
                    :key="target.id"
                    class=" text-sm pt-2"
                >
                    <span
                        v-for="item in target.items"
                        :class="{'font-bold': item.type == 'target' || item.type == 'deadline'}" 
                    >
                        {{item.value}} <span class="mr-1" v-if="item.type != 'deadline'">{{item.unit}}</span>
                    </span>
                </li>
            </ul>
            <div class="flex justify-end" v-if="area.baseline.baselineValue">
                <span>Baseline {{area.baseline.baselineValue}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>