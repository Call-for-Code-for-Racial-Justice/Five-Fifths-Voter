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

const sourceList = computed(() => {
  if (Array.isArray(props.item.source)) return props.item.source;
  else if (props.item.source === null) return null;
  return [props.item.source];
});
</script>

<template>
  <div
      class="grid grid-cols-2 lg:grid-cols-[1fr_80px_1fr_72px] gap-y-1.5 gap-x-2 lg:gap-2 px-4 py-2.5 border-t border-base-200 items-center text-sm lg:text-base">
    <!-- Topic + note -->
    <div class="col-span-2 lg:col-span-1">
      <div class="font-medium text-base-content text-xs lg:text-base leading-snug">{{ item.topic }}</div>
      <div v-if="item.note" class="text-xs lg:text-base text-base-content/50 mt-0.5 leading-tight">{{ item.note }}</div>
    </div>
    <div class="flex justify-start lg:justify-center">
    <CandidateCoverageDot :coverage="item.coverage" :label="coverageLabel"/>
    </div>
    <!-- Position tag -->
    <div class="flex justify-start lg:justify-center min-w-0">
      <CandidatePositionTag
          class="badge-sm lg:badge-lg truncate max-w-full"
          :position-type="item.position_type"
          :position-tag="item.position_tag"
      />
    </div>

    <!-- Source badge -->
    <div class="flex justify-end lg:justify-center gap-1">
      <template v-if="sourceList">
        <div class="lg:hidden text-xs font-extralight">Source</div>
        <a
            v-for="(idx, which) in sourceList"
            :key="idx"
            :href="links?.[idx]?.url"
            target="_blank"
            rel="noreferrer"
            class="link link-hover"
            :title="links?.[idx]?.label"
        >
          {{ idx + 1 }} {{ which === sourceList.length - 1 ? "" : "," }}
        </a>
      </template>
      <span v-else class="hidden lg:block text-base-content/30">—</span>
    </div>
  </div>
</template>
