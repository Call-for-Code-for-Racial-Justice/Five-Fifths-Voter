<script setup lang="ts">
import type { ContentCandidate } from "~/types/candidate";
import type { ContentSectionItem, ContentSection } from "~/types/section";

const props = defineProps<{
  candidate: ContentCandidate
}>();

const allPosItems = computed(() => {
  return props.candidate.sections.flatMap((section: ContentSection) =>
    section.items.filter((item: ContentSectionItem) => item.position_type === "pos"),
  );
});

const displayedItemsCount = computed(() => {
  return props.candidate.sections.reduce((acc: number, section: ContentSection) => {
    const posItems = section.items.filter((item: ContentSectionItem) => item.position_type === "pos");
    return acc + Math.min(posItems.length, 2);
  }, 0);
});

const remainingCount = computed(() => {
  return allPosItems.value.length - displayedItemsCount.value;
});
</script>

<template>
  <div class="flex flex-wrap gap-1 mt-2">
    <template v-for="section in candidate.sections" :key="section.id">
      <template
        v-for="item in (section.items as ContentSectionItem[]).filter(i => i.position_type === 'pos').slice(0, 2)"
        :key="item.topic"
      >
        <CandidatePositionTag
          class="badge-xs"
          :position-type="item.position_type"
          :position-tag="item.position_tag"
        />
      </template>
    </template>
    <span v-if="remainingCount > 0" class="badge badge-xs badge-outline">+{{ remainingCount }} more</span>
    <span class="badge badge-xs badge-ghost">View scorecard →</span>
  </div>
</template>
