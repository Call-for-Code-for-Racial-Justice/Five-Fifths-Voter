<script setup lang="ts">
defineProps<{
  value: number
  label: string
  mobileLabel: string
}>();
</script>

<template>
  <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
    <div class="countdown font-mono grid place-items-center text-sm md:text-5xl lg:text-7xl">
      <div :style="`--value:${value}`" aria-live="polite" :aria-label="`${value}`">{{ value }}</div>
    </div>
    <span class="block md:hidden text-xs">{{ mobileLabel }}</span>
    <span class="hidden md:block">{{ label }}</span>
  </div>
</template>
