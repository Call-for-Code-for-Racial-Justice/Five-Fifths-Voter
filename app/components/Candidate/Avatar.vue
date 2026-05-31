<script setup lang="ts">
defineProps<{
  initials: string
}>();
</script>

<template>
  <div class="avatar avatar-placeholder">
    <div class="bg-neutral text-neutral-content dark:bg-neutral-content dark:text-neutral w-10 rounded-full">
      <span class="text-xs font-medium">{{ initials }}</span>
    </div>
  </div>
</template>
