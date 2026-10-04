<script setup lang="ts">

defineProps<{
  initials: string
  name: string
  wikimedia: string
}>();

const hasError = ref(false);
</script>

<template>
  <div class="avatar avatar-placeholder">
    <div class="bg-neutral text-neutral-content dark:bg-neutral-content dark:text-neutral w-10 lg:w-16 rounded-full">
      <span class="text-xs lg:text-lg font-medium">
          <img
              v-if="wikimedia && !hasError"
              width="60" :alt="name"
              :src="wikimedia" @error="hasError = true"
          >
        <span v-else>{{ initials }}</span>
      </span>
    </div>
  </div>
</template>
