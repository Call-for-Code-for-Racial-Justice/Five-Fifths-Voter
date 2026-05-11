<script setup lang="ts">
interface SectionItem {
  topic: string
  note?: string
  coverage: number
  position_tag: string | null
  position_type: "pos" | "mixed" | "none"
  source: "debate" | "website" | "both" | null
}

const props = defineProps<{
  item: SectionItem
}>();

const coverageLabel = computed(() => {
  const map: Record<number, string> = {
    0: "Not found",
    1: "Brief",
    2: "General",
    3: "Specific",
  };
  return map[props.item.coverage] ?? "";
});
</script>

<template>
  <div class="grid grid-cols-[1fr_80px_1fr_72px] gap-2 px-4 py-2.5 border-t border-base-200 items-center text-sm">
    <!-- Topic + note -->
    <div>
      <div class="font-medium text-base-content text-xs leading-snug">{{ item.topic }}</div>
      <div v-if="item.note" class="text-xs text-base-content/50 mt-0.5 leading-tight">{{ item.note }}</div>
    </div>

    <!-- Coverage dots -->
    <div class="flex flex-col items-center gap-0.5">
      <div class="flex gap-1 justify-center">
        <span
          v-for="n in 3"
          :key="n"
          class="w-2.5 h-2.5 rounded-full"
          :class="n <= item.coverage ? 'bg-success' : 'bg-base-300'"
        />
      </div>
      <span class="text-[10px] text-base-content/40 leading-none mt-0.5">{{ coverageLabel }}</span>
    </div>

    <!-- Position tag -->
    <div class="flex justify-center">
      <span v-if="item.position_type === 'pos'" class="badge badge-sm badge-success">
        {{ item.position_tag }}
      </span>
      <span v-else-if="item.position_type === 'mixed'" class="badge badge-sm badge-warning">
        {{ item.position_tag }}
      </span>
      <span v-else class="text-xs text-base-content/40 italic">No position found</span>
    </div>

    <!-- Source badge -->
    <div class="flex justify-center">
      <span v-if="item.source === 'debate'" class="badge badge-xs badge-success badge-outline">Debate</span>
      <span v-else-if="item.source === 'website'" class="badge badge-xs badge-ghost">Website</span>
      <span v-else-if="item.source === 'both'" class="badge badge-xs badge-secondary badge-outline">Both</span>
      <span v-else class="text-base-content/30">—</span>
    </div>
  </div>
</template>
