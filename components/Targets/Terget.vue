<script setup lang="ts">
import type { IParsedItem } from '~/types';

interface Props {
    item: IParsedItem
}

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update', item: IParsedItem): void
}>()

const targetModalRef = ref()

const targetItem = reactive<IParsedItem>({
    type: 'target',
    value: props.item.value,
    unit: props.item.unit
})

const targetUnitMenuChangeActive = ref<boolean>(false)

onClickOutside(targetModalRef, () => {
    targetUnitMenuChangeActive.value = false
})

const changeTargetUnitHandler = (v: string) => {
    targetItem.unit = v
    targetUnitMenuChangeActive.value = false
}

watchEffect(() => {
    emits('update', {
        type: targetItem.type,
        value: targetItem.value,
        unit: targetItem.unit
    })
})
</script>

<template>
    <div class="flex items-center relative">
        <input 
            type="text" 
            v-model="targetItem.value"
            class="w-[60px] h-6 p-1 bg-slate-300 rounded-l-sm"
            placeholder="target"
        >
        <span 
            class="px-1 rounded-r-sm bg-slate-500 cursor-pointer text-white"
            @click="targetUnitMenuChangeActive = true"
        >{{targetItem.unit}}</span>
        <MenusTargetUnit
            ref="targetModalRef" 
            class=" absolute top-7 left-10"
            @change="changeTargetUnitHandler"
            v-if="targetUnitMenuChangeActive"
            :value="targetItem.unit!"
        />
    </div>
</template>

<style scoped>

</style>