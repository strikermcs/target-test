<script setup lang="ts">
import type { ITarget } from '~/types';

interface Props {
    target : ITarget
}

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'targetChange', target: Partial<ITarget>): void
}>()

const targetUnitMenuChangeActive = ref<boolean>(false)
const deadlineUnitMenuChangeActive = ref<boolean>(false)

const targetObj = reactive({
    targetValue: props.target.targetValue,
    targetUnit: props.target.targetUnit,
    deadlineValue: props.target.deadlineValue,
    deadlineUnit: props.target.deadlineUnit
})


const changeTargetUnitHandler = (v: string) => {
    targetObj.targetUnit = v
    targetUnitMenuChangeActive.value = false
}

const changeDeadlineUnitHandler = (v: string) => {
    targetObj.deadlineUnit = v
    deadlineUnitMenuChangeActive.value = false
}


watchEffect(() => {
    emits('targetChange', {
        id: props.target.id,
        targetValue: targetObj.targetValue,
        targetUnit: targetObj.targetUnit,
        deadlineValue: targetObj.deadlineValue,
        deadlineUnit: targetObj.deadlineUnit
    })
})
</script>

<template>
    <div class="flex items-center gap-2">
        <span>{{target.startText}}</span>
        <div class="flex items-center relative">
            <input 
                type="text" 
                v-model="targetObj.targetValue"
                class="w-[60px] h-6 p-1 bg-slate-300 rounded-l-sm"
            >
            <span 
                class="px-1 rounded-r-sm bg-slate-500 cursor-pointer text-white"
                @click="targetUnitMenuChangeActive = true"
            >{{targetObj.targetUnit}}</span>
            <MenusTargetUnit 
                class=" absolute top-7 left-10"
                @change="changeTargetUnitHandler"
                v-if="targetUnitMenuChangeActive"
            />
        </div>
        <span>{{target.centerText}}</span>
        <div class="flex items-center relative">
            <input 
                type="text" 
                v-model="targetObj.deadlineValue"
                class="w-[70px] h-6 p-1 bg-slate-300 rounded-l-sm"
            />
            <span 
                class="px-1 rounded-r-sm bg-slate-500 cursor-pointer text-white"
                @click="deadlineUnitMenuChangeActive = true"
            >{{targetObj.deadlineUnit}}</span>
            <MenusDateUnit 
                class=" absolute top-7 left-10"
                v-if="deadlineUnitMenuChangeActive"
                @change="changeDeadlineUnitHandler"
            />
        </div>
        <span>{{target.endText}}</span>
    </div>
</template>

<style scoped>

</style>