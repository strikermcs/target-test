<script setup lang="ts">
interface Props {
    value: string
}

const props = defineProps<Props>()

const values = [
    '%',
    'Custom'
]

const valueUnit = ref<string>(props.value == '%' ? '%' : 'Custom')
const customValue = ref<string>(props.value == '%' ? 'km': props.value) 

const emits = defineEmits<{
    (e: 'change', value: string): void
}>()

const changeHandler = (value : string) => {
    valueUnit.value = value
}

const changeValue = () => {
    if(valueUnit.value === 'Custom') {
        emits('change', customValue.value)
    }else {
        emits('change', valueUnit.value)
    }
}

</script>

<template>
    <div class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <div class="p-6">
            <UiRadioButtonGroup :values="values" @change="changeHandler" :default-value="value== '%' ? '%': 'Custom'"/>
            <input type="text" v-model="customValue" v-if="valueUnit==='Custom'" class="h-6 w-full p-1 mb-3"/>
            <UiButton @click="changeValue">Change</UiButton>
        </div>     
    </div>
</template>v

<style scoped>

</style>