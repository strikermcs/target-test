<script setup lang="ts">
import type { IArea } from '~/types';

interface Props {
    area: IArea
}

defineProps<Props>()
defineEmits<{
    (e: 'editClick'): void
}>()
</script>

<template>
    <div>
        <p class=" text-gray-500 mb-1">Target definition</p>
        <div class="p-6 bg-slate-200 rounded hover:bg-slate-300 cursor-pointer relative group/edit " @click="$emit('editClick')">
            <div class="group-hover/edit:visible absolute top-3 right-3 invisible ">
                <svg class="w-5 h-5 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                 </svg>
            </div>
            <ul>
                <li
                    v-for="target in area.targets"
                    :key="target.id"
                >
                    <span
                        v-for="item in target.items"
                        :class="{'font-bold': item.type == 'target' || item.type == 'deadline'}" 
                    >
                        {{item.value}} <span class="mr-1" v-if="item.type != 'deadline'">{{item.unit}}</span>
                    </span>
                </li>
            </ul>
            <div class="flex justify-end">
                <span>Baseline {{area.baseline.baselineValue}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>