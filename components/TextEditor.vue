<script setup lang="ts">
import type { ITarget } from '~/types'
import { parseTargetString } from '~/helpers'

const emits = defineEmits<{
    (e: 'createTarget', target: ITarget): void
}>()

const contextMenuOpen = ref<boolean>(false)

const menuLeftPosition = computed(() => {
    return `${innerText.value.length * 7}px`
})

const innerText = ref<string>('')

const isTarget = computed(() => {
    return innerText.value?.includes('|target|%|')
})

const isDeadline = computed(() => {
    return innerText.value.includes('|deadline|Year|')
})

const insertTargetHandler = () => {
    innerText.value += ' |target|%| '
    contextMenuOpen.value = false
}

const insertDeadlineHandler = () => {
    innerText.value += ' |deadline|Year| '
    contextMenuOpen.value = false
}

const createTarget = () => {
    const parsedString = parseTargetString(innerText.value)
    const target:ITarget = {id: Date.now().toString(), ...parsedString} as ITarget

    emits('createTarget', target)
}

watchEffect(() => {
    if(isTarget.value && isDeadline.value) {
        createTarget()
    }
})

watch(() => innerText.value, () => {
    if(innerText.value.includes('/')) {
        innerText.value = innerText.value.slice(0, -1)
        contextMenuOpen.value = true
    }
})
</script>

<template>
        <div> 
            <div class="flex justify-end">
                <UIButton @click="insertTargetHandler" v-if="!isTarget">Insert Target</UIButton>
                <UIButton @click="insertDeadlineHandler" v-if="!isDeadline">Insert Deadline</UIButton>
            </div>
            <div class="relative">
                <UIInput v-model="innerText" @enterKeyPress="createTarget" placeholder="Start writing target description...."/>
                <UiContextMenu
                    v-if="contextMenuOpen"
                    class=" absolute top-7 menu" 
                    :isDeadline="isDeadline"
                    :isTarget="isTarget"
                    @insertTarget="insertTargetHandler"
                    @insertDeadline="insertDeadlineHandler"
                />
            </div>
        </div>
</template>

<style scoped>
.menu {
    left: v-bind(menuLeftPosition);
}
</style>