<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import type { IParsedItem } from '~/types';
import { getFormatDate } from '~/helpers'

interface Props {
    item: IParsedItem
}

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update', item: IParsedItem): void
}>()

const deadlineModalRef = ref()
const datePickerRef = ref()

const deadlineItem = reactive<IParsedItem>({
    type: 'deadline',
    value: props.item.value,
    unit: props.item.unit
})

const datePickerActive = ref<boolean>(false)
const deadlineUnitMenuChangeActive = ref<boolean>(false)

onClickOutside(datePickerRef, () => {
    datePickerActive.value = false
})

onClickOutside(deadlineModalRef, () => {
    deadlineUnitMenuChangeActive.value = false
})


const changeDeadlineUnitHandler = (v: string) => {
    deadlineItem.unit = v
    deadlineUnitMenuChangeActive.value = false
}

const formatDate = (date: any) => {
    deadlineItem.value = getFormatDate(date, deadlineItem.unit!)
    datePickerActive.value = false
    return date
}    

const inputDeadlineClick = () => {
    datePickerActive.value = true
}


watchEffect(() => {
    emits('update', {
        type: 'deadline',
        value: deadlineItem.value,
        unit: deadlineItem.unit
    })
})
</script>

<template>
    <div class="flex items-center relative">
        <div class=" absolute top-5 left-5 z-30" 
            ref="datePickerRef"
            v-if="datePickerActive" 
        >
            <VueDatePicker 
                inline
                auto-apply
                :year-picker="deadlineItem.unit === 'Year'"
                :month-picker="deadlineItem.unit === 'Month'"
                :format="formatDate"
            /> 
        </div> 
        <input 
            type="text" 
            @click="inputDeadlineClick"
            v-model="deadlineItem.value"
            class="w-[70px] h-6 p-1 bg-slate-300 rounded-l-sm"
            placeholder="deadline"
            readonly
        />
        <span 
            class="px-1 rounded-r-sm bg-slate-500 cursor-pointer text-white"
            @click="deadlineUnitMenuChangeActive = true"
        >{{deadlineItem.unit}}</span>
        <MenusDateUnit
            ref="deadlineModalRef" 
            class=" absolute top-7 left-10"
            v-if="deadlineUnitMenuChangeActive"
            @change="changeDeadlineUnitHandler"
            :value="deadlineItem.unit!"
        />
    </div>
</template>

<style scoped>

</style>