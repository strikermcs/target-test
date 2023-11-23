<script setup lang="ts">
import type { ITarget, IArea } from '~/types';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const baselineMenuActive = ref<boolean>(false)
const baselineInserted = ref<boolean>(false)
const targetEditFormRef = ref()
const baselineMenuRef = ref()
const datePickerRef = ref()
const datePickerActive = ref(false)
const isReadMode = ref<boolean>(false)

const Area = reactive<IArea>({
    id: Date.now().toString(),
    baseline: {
        baselineValue: '',
        baselineUnit: 'Year'
    },
    targets: []
})


onClickOutside(targetEditFormRef, () => {
    if(Area.targets.length > 0) {
        isReadMode.value = true
    }
})

onClickOutside(datePickerRef, () => {
    datePickerActive.value = false
})

onClickOutside(baselineMenuRef, () => {
    baselineMenuActive.value = false
})

const createTargetHandler = (target: ITarget) => {
    Area.targets.push(target)
}

const createNewTarget = () => {
    const newTarget: ITarget= {
        id: Date.now().toString(),
        targetValue: 'target',
        targetUnit: Area.targets[0].targetUnit,
        deadlineValue: 'deadline',
        deadlineUnit: Area.targets[0].deadlineUnit,
        startText: Area.targets[0].startText,
        centerText: Area.targets[0].centerText,
        endText: Area.targets[0].endText
    }
    Area.targets.push(newTarget)
}

const targetChangeHandler = (target: Partial<ITarget>) => {
    Area.targets.forEach(t => {
        if(t.id === target.id) {
            t.targetValue = target.targetValue as string
            t.targetUnit = target.targetUnit as string
            t.deadlineValue = target.deadlineValue as string
            t.deadlineUnit = target.deadlineUnit as string
        }
    })
}

const formatDate = (date: any) => {
    if(Area.baseline.baselineUnit === 'Day'){
       setTimeout(() => {
        Area.baseline.baselineValue = `${date.getDate()}`
       },10) 
       datePickerActive.value = false
    }
   
    if(Area.baseline.baselineUnit === 'Month'){
        setTimeout(() => {
            Area.baseline.baselineValue = `${date.getMonth()}`
       },10) 
         
       datePickerActive.value = false
    }

    datePickerActive.value = false
    return `${date}`
}    

const inputDeadlineClick = () => {
    Area.baseline.baselineValue = ''
    datePickerActive.value = true
}

const changeBaselineUnitHandler = (v: string) => {
    Area.baseline.baselineUnit = v
    baselineMenuActive.value = false
}

const insertBaseLineHandler = () => {
    baselineInserted.value = true
    Area.baseline.baselineValue = ''
}
</script>

<template>
    <div class="flex w-full gap-6">
        <div class="max-w-[800px] w-full">
            <div 
                v-if="Area.targets.length > 0 && !isReadMode" 
                ref="targetEditFormRef"
            >
                <div class="flex justify-end">
                    <UiButton 
                        v-if="!baselineInserted"
                        @click="insertBaseLineHandler"
                    >Insert Baseline</UiButton>
                </div>
                <ul  class=" bg-gray-200 p-8 rounded">
                    <li
                    v-for="target in Area.targets"
                    :key="target.id"
                    class="pt-4"
                    >
                        <Target :target="target" @target-change="targetChangeHandler"/>
                    </li>
                </ul>
                <div class="flex justify-end mt-4" v-if="baselineInserted">
                    <div class="flex items-center relative">
                        <span class="mr-3">Baseline</span>
                        <div class=" absolute top-5 left-5" 
                                ref="datePickerRef"
                                v-if="datePickerActive" 
                            >
                                <VueDatePicker 
                                    v-model="Area.baseline.baselineValue" 
                                    inline
                                    auto-apply
                                    :year-picker="Area.baseline.baselineUnit === 'Year'"
                                    :format="formatDate"
                                /> 
                            </div> 
                        <input 
                            type="text"
                            @click="inputDeadlineClick" 
                            v-model="Area.baseline.baselineValue"
                            class="w-[70px] p-1 h-6 bg-slate-200"
                            placeholder="baseline"
                            readonly
                        />
                        <span 
                            class="px-1 bg-gray-500 text-white cursor-pointer"
                            @click="baselineMenuActive = true"
                        >{{Area.baseline.baselineUnit}}</span>
                        <MenusDateUnit
                            ref="baselineMenuRef"
                            class=" absolute top-7 left-10" 
                            v-if="baselineMenuActive"
                            @change="changeBaselineUnitHandler"
                        />
                    </div>
                </div>
                <div class=" border-t-2 border-gray-600 mt-2">
                    <UiButton
                        class="mt-2"
                        @click="createNewTarget"
                    >Add new</UiButton>
                </div>
            </div>
            <ReadModeTarget :area="Area" v-else-if="Area.targets.length > 0 && isReadMode" @edit-click="isReadMode = false"/>
            <TextEditor v-else @create-target="createTargetHandler"/>
        </div>
        
        <TargetPreview :area="Area"/>
    </div>
</template>

<style scoped>

</style>