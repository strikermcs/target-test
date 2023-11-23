<script setup lang="ts">
interface Props {
    modelValue?: string | undefined | number
    disabled?: boolean
    label?: string
    placeholder?: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void,
    (e: 'enterKeyPress'): void
}>()

const inputEventHandler = (e: any) => {
    emits('update:modelValue', e.target.value)
}
</script>


<template>
    <div>
        <p
        class="mb-1 text-left text-sm"
        v-if="label"
      >
        {{ label }}
      </p>
        <input 
            type="text"
            rows="4" 
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            @input="inputEventHandler"
            @keydown.=""
            @keyup.enter="$emit('enterKeyPress')"
        />
      
    </div>
</template>

<style scoped>

</style>