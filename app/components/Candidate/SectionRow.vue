<script setup lang="ts">
import type { ContentSectionItem } from "~/types/section";

const props = defineProps<{
  item: ContentSectionItem
  links?: { label: string, url: string }[]
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

    <CandidateCoverageDot :coverage="item.coverage" :label="coverageLabel" />

    <!-- Position tag -->
    <div class="flex justify-center">
      <CandidatePositionTag
        class="badge-sm"
        :position-type="item.position_type"
        :position-tag="item.position_tag"
      />
    </div>

    <!-- Source badge -->
    <div class="flex justify-center gap-1">
      <template v-if="Array.isArray(item.source)">
        <a
          v-for="(idx, which) in item.source"
          :key="idx"
          :href="links?.[idx]?.url"
          target="_blank"
          rel="noreferrer"
          class="link link-hover"
          :title="links?.[idx]?.label"
        >
          {{ idx + 1 }} {{ which === item.source.length - 1 ? "" : ","}}
        </a>
      </template>
      <span v-else class="text-base-content/30">—</span>
    </div>
  </div>
</template>
