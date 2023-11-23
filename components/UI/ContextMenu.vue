<script setup lang="ts">
interface Props {
    isTarget: boolean
    isDeadline: boolean
}

defineProps<Props>()
defineEmits<{
    (e: 'insertDeadline'): void,
    (e: 'insertTarget'): void
}>()

</script>

<template>
    <div class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li class="cursor-pointer" @click="$emit('insertTarget')" v-if="!isTarget">
                <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Insert target
                </span>
            </li>
            <li class="cursor-pointer" @click="$emit('insertDeadline')" v-if="!isDeadline">
                <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Insert Deadline
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>