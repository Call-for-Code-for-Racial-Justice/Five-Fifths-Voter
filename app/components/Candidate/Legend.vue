<script setup lang="ts">
const coverageItems = [
  { filled: 3, label: "Specifically addressed" },
  { filled: 2, label: "Generally mentioned" },
  { filled: 1, label: "Briefly mentioned" },
  { filled: 0, label: "Not found" },
];
</script>

<template>
  <div class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-content">
    <!-- Coverage -->
    <div class="flex items-center gap-1.5 font-medium">Coverage:</div>
    <div v-for="item in coverageItems" :key="item.label" class="flex items-center gap-1.5">
      <div class="flex gap-0.5">
        <span
          v-for="n in 3"
          :key="n"
          class="w-2 h-2 rounded-full"
          :class="n <= item.filled ? 'bg-success' : 'bg-base-300'"
        />
      </div>
      <span>{{ item.label }}</span>
    </div>

    <!-- Divider -->
    <div class="w-px h-3 bg-base-300 self-center hidden sm:block" />

    <!-- Sources -->
    <div class="flex items-center gap-1.5 font-medium">Sources:</div>
    <div class="flex items-center gap-1.5">
      <span class="badge badge-xs badge-success badge-outline">Debate</span>
      <span>Primary source</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="badge badge-xs badge-ghost">Website</span>
      <span>Secondary source</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="badge badge-xs badge-secondary badge-outline">Both</span>
      <span>Confirmed in both</span>
    </div>
  </div>
</template>
