<script setup lang="ts">
import type { IParsedItem, ITarget, TParsedItemType } from '~/types';

interface Props {
    target : ITarget
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'targetChange', target: ITarget): void
}>()

const targetComponent = resolveComponent('TargetsTerget')
const deadlineComponent = resolveComponent('TargetsDeadline')
const textComponent = resolveComponent('TargetsText')

const dragOtions = computed(() => {
  return {
    animation: 200,
    class: 'flex gap-2 flex-wrap'

  }
})

const comp = computed(() => {
    return (type : TParsedItemType) => {
        if(type === 'target') return targetComponent
        if(type === 'deadline') return deadlineComponent
        return textComponent 
    }
})

const targetObj = ref<ITarget>(props.target)

const updateTemplateHandler = (item: IParsedItem) => {
    targetObj.value.items.forEach(i => {
        if(i.type === item.type) {
            i.value = item.value
            i.unit = item.unit
        }
    })

    emits('targetChange', targetObj.value)
}



watchEffect(() => {
    emits('targetChange', {
        id: props.target.id,
        items: targetObj.value.items
    })
})
</script>

<template>
    <div>
        <draggable v-model="targetObj.items" v-bind="dragOtions">
            <div
                v-for="(item, index) in targetObj.items"
                :key="index"
                class=""
            >
                <component :is="comp(item.type)" :item="item" @update="updateTemplateHandler"/>
            </div>
        </draggable>
    </div>
</template>

<style scoped>

</style>