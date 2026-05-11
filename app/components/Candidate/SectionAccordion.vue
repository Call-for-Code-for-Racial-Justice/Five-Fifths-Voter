<script setup lang="ts">
interface SectionItem {
  topic: string
  note?: string
  coverage: number
  position_tag: string | null
  position_type: "pos" | "mixed" | "none"
  source: "debate" | "website" | "both" | null
}

interface Section {
  id: string
  title: string
  items: SectionItem[]
}

const props = defineProps<{
  section: Section
}>();

// Assign a distinct neutral dot colour per section based on id
const sectionDotClass = computed(() => {
  const map: Record<string, string> = {
    "economic-security": "bg-success",
    "civil-rights-justice": "bg-secondary",
    "access-services": "bg-warning",
    "community-environment": "bg-error",
  };
  return map[props.section.id] ?? "bg-neutral";
});
</script>

<template>
  <div class="collapse collapse-arrow bg-base-100 shadow-sm">
    <input type="checkbox" >

    <!-- Collapsed header -->
    <div class="collapse-title py-3 px-4 min-h-0">
      <div class="flex items-start gap-2">
        <span
          class="w-2 h-2 rounded-full shrink-0 mt-1.5"
          :class="sectionDotClass"
        />
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-base-content">{{ section.title }}</div>
          <!-- Position tag summary in collapsed state -->
          <div class="flex flex-wrap gap-1.5 mt-1.5">
            <template v-for="item in section.items" :key="item.topic">
              <span v-if="item.position_type === 'pos'" class="badge badge-sm badge-success gap-1">
                {{ item.position_tag }}
              </span>
              <span v-else-if="item.position_type === 'mixed'" class="badge badge-sm badge-warning gap-1">
                {{ item.position_tag }}
              </span>
              <span v-else class="badge badge-sm badge-ghost text-base-content/40 italic">
                {{ item.topic }}: no position found
              </span>
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
        />
      </div>
    </div>
  </div>
</template>
