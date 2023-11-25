<script setup lang="ts">
import type { IParsedItem } from '~/types'

interface Props {
    item: IParsedItem
}

defineProps<Props>()
</script>

<template>
    <span>{{item.value}}</span>
</template>

<style scoped>

</style>