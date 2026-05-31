<script setup lang="ts">
import type { ContentSection } from "~/types/section";

defineProps<{
  section: ContentSection
  links?: { label: string, url: string }[]
}>();

</script>

<template>
  <div class="collapse collapse-arrow bg-base-100 shadow-sm dark:border dark:border-accent">
    <input type="checkbox" >

    <!-- Collapsed header -->
    <div class="collapse-title py-3 px-4 min-h-0">
      <div class="flex items-start gap-2">
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-base-content">{{ section.title }}</div>
          <!-- Position tag summary in collapsed state -->
          <div class="flex flex-wrap gap-1.5 mt-1.5">
            <template v-for="item in section.items" :key="item.topic">
              <CandidatePositionTag
                class="badge-sm"
                :position-type="item.position_type"
                :position-tag="item.position_tag"
                :topic="item.topic"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Expanded content -->
    <div class="collapse-content px-0 pb-0">
      <div class="border-t border-base-200">
        <!-- Column headers -->
        <div class="grid grid-cols-[1fr_80px_1fr_72px] gap-2 px-4 py-1.5 bg-base-200 text-xs text-base-content/50">
          <div>Topic</div>
          <div class="text-center">Coverage</div>
          <div class="text-center">Stated position</div>
          <div class="text-center">Source</div>
        </div>

        <!-- Rows -->
        <CandidateSectionRow
          v-for="item in section.items"
          :key="item.topic"
          :item="item"
          :links="links"
        />
      </div>
    </div>
  </div>
</template>
