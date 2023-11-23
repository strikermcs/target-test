<script setup lang="ts">
interface Props {
    values: Array<string>
    defaultValue: string    
}
defineProps<Props>()
defineEmits<{
    (e: 'change', value: string): void
}>()

</script>

<template>
    <div class="flex gap-3">
        <div class="flex items-center mb-4"
            v-for="value in values"
            :key="value"
        >
            <input type="radio" :value="value" name="default-radio" :checked="value === defaultValue"
                @click="$emit('change', value)" 
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <span class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{value}}</span>
        </div>
    </div>
</template>

<style scoped>

</style>