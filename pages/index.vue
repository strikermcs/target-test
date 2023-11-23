<script setup lang="ts">
import type { ITarget, IArea } from '~/types';

const baselineMenuActive = ref<boolean>(false)
const baselineInserted = ref<boolean>(false)
const targetEditFormRef = ref()
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

const changeBaselineUnitHandler = (v: string) => {
    Area.baseline.baselineUnit = v
    baselineMenuActive.value = false
}

const insertBaseLineHandler = () => {
    baselineInserted.value = true
    Area.baseline.baselineValue = 'baseline'
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
                        <input 
                            type="text" 
                            v-model="Area.baseline.baselineValue"
                            class="w-[70px] p-1 h-6 bg-slate-200"
                        />
                        <span 
                            class="px-1 bg-gray-500 text-white cursor-pointer"
                            @click="baselineMenuActive = true"
                        >{{Area.baseline.baselineUnit}}</span>
                        <MenusDateUnit
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