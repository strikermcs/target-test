<script setup lang="ts">
import type { ITarget, IArea, IParsedItem } from '~/types';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getFormatDate } from '~/helpers'

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
    const items:IParsedItem[] = []

    Area.targets[0].items.forEach(i => {
        if(i.type === 'target') {
            const item: IParsedItem = {
                type: 'target',
                value: '',
                unit: i.unit
            }
            items.push(item)
        } else if(i.type === 'deadline') {
            const item: IParsedItem = {
                type: 'deadline',
                value: '',
                unit: i.unit
            }
            items.push(item)
        } else {
            items.push(i)
        }
    })

    const newTarget: ITarget= {
        id: Date.now().toString(),
        items
    }

    Area.targets.push(newTarget)
}

const targetChangeHandler = (target: ITarget) => {
    Area.targets.forEach(t => {
        if(t.id === target.id) {
            t.items = target.items
        }
    })
}

const formatDate = (date: any) => {
    Area.baseline.baselineValue = getFormatDate(date, Area.baseline.baselineUnit)
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
    <div class="flex w-full gap-6 flex-wrap flex-col-reverse md:flex-nowrap md:flex-row">
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
                        <div class=" absolute top-5 left-5 z-30" 
                                ref="datePickerRef"
                                v-if="datePickerActive" 
                            >
                                <VueDatePicker 
                                    inline
                                    auto-apply
                                    :year-picker="Area.baseline.baselineUnit === 'Year'"
                                    :month-picker="Area.baseline.baselineUnit === 'Month'"
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
                            :value="Area.baseline.baselineUnit"
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