<script setup lang="ts">

interface Props {
  coverage: number // 0-100 percent coverage
  label: string
}

defineProps<Props>();

</script>

<template>
  <!-- Coverage dots -->
  <div class="flex flex-col items-center gap-0.5">
    <div class="flex gap-1 justify-center">
        <span
            v-for="n in 3"
            :key="n"
            class="w-2.5 h-2.5 rounded-full"
            :class="n <= coverage ? 'bg-success' : 'bg-base-300'"
        />
    </div>
    <span class="text-xs text-base-content/40 leading-none mt-0.5">{{ label }}</span>
  </div>
</template>

<style scoped>
</style>
