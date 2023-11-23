<script setup lang="ts">
import type { ITarget } from '~/types';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

interface Props {
    target : ITarget
}

const props = defineProps<Props>()
const targetModalRef = ref()
const deadlineModalRef = ref()
const datePickerRef = ref()
const datePickerActive = ref(false)

const emits = defineEmits<{
    (e: 'targetChange', target: Partial<ITarget>): void
}>()

const targetUnitMenuChangeActive = ref<boolean>(false)
const deadlineUnitMenuChangeActive = ref<boolean>(false)

onClickOutside(targetModalRef, () => {
    targetUnitMenuChangeActive.value = false
})

onClickOutside(datePickerRef, () => {
    datePickerActive.value = false
})

onClickOutside(deadlineModalRef, () => {
    deadlineUnitMenuChangeActive.value = false
})

const targetObj = reactive({
    targetValue: props.target.targetValue === 'target' ? '' : props.target.targetValue,
    targetUnit: props.target.targetUnit,
    deadlineValue: props.target.deadlineValue === 'deadline' ? '' : props.target.deadlineValue,
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

const formatDate = (date: any) => {
    if(targetObj.deadlineUnit === 'Day'){
       setTimeout(() => {
        targetObj.deadlineValue = `${date.getDate()}`
       },10) 
       datePickerActive.value = false
    }
   
    if(targetObj.deadlineUnit === 'Month'){
        setTimeout(() => {
            targetObj.deadlineValue = `${date.getMonth() + 1}`
       },10) 
         
       datePickerActive.value = false
    }

    datePickerActive.value = false
    return `${date}`
}    

const inputDeadlineClick = () => {
    targetObj.deadlineValue = ''
    datePickerActive.value = true
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
                placeholder="target"
            >
            <span 
                class="px-1 rounded-r-sm bg-slate-500 cursor-pointer text-white"
                @click="targetUnitMenuChangeActive = true"
            >{{targetObj.targetUnit}}</span>
            <MenusTargetUnit
                ref="targetModalRef" 
                class=" absolute top-7 left-10"
                @change="changeTargetUnitHandler"
                v-if="targetUnitMenuChangeActive"
            />
        </div>
        <span>{{target.centerText}}</span>
        <div class="flex items-center relative">
            <div class=" absolute top-5 left-5 z-30" 
                ref="datePickerRef"
                v-if="datePickerActive" 
            >
                <VueDatePicker 
                    v-model="targetObj.deadlineValue" 
                    inline
                    auto-apply
                    :year-picker="targetObj.deadlineUnit === 'Year'"
                    :month-picker="targetObj.deadlineUnit === 'Month'"
                    :format="formatDate"
                /> 
            </div> 
            <input 
                type="text" 
                @click="inputDeadlineClick"
                v-model="targetObj.deadlineValue"
                class="w-[70px] h-6 p-1 bg-slate-300 rounded-l-sm"
                placeholder="deadline"
                readonly
            />
            <span 
                class="px-1 rounded-r-sm bg-slate-500 cursor-pointer text-white"
                @click="deadlineUnitMenuChangeActive = true"
            >{{targetObj.deadlineUnit}}</span>
            <MenusDateUnit
                ref="deadlineModalRef" 
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