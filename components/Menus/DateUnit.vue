<script setup lang="ts">
interface Props {
    value: string
}

const props = defineProps<Props>()

const values = [
    'Year',
    'Month',
    'Day'
]

const valueUnit = ref<string>(props.value)

const emits = defineEmits<{
    (e: 'change', value: string): void
}>()

const changeHandler = (value : string) => {
    valueUnit.value = value
}

const changeValue = () => {
 emits('change', valueUnit.value)
}

</script>

<template>
    <div class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
        <div class="p-6">
            <UiRadioButtonGroup :values="values" @change="changeHandler" :default-value="value"/>
            <UiButton @click="changeValue">Change</UiButton>
        </div>     
    </div>
</template>v

<style scoped>

</style>