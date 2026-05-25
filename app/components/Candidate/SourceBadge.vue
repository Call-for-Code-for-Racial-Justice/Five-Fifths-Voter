<script setup lang="ts">
interface SourceBadgeItem {
  source: string
}

const { item } = defineProps<{
  item: SourceBadgeItem
}>();
</script>

<template>
  <div class="flex justify-center">
    <span v-if="item.source === 'debate'" class="badge badge-xs badge-success badge-outline">Debate</span>
    <span v-else-if="item.source === 'website'" class="badge badge-xs badge-ghost">Website</span>
    <span v-else-if="item.source === 'both'" class="badge badge-xs badge-secondary badge-outline">Both</span>
    <span v-else class="text-base-content/30">—</span>
  </div>
</template>

<style scoped>
/* Existing styles can be added here if needed */
</style>
