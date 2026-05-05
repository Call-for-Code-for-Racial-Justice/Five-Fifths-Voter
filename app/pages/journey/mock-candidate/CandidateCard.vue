<script setup lang="ts">
import AlignmentRow from "~/pages/journey/mock-candidate/AlignmentRow.vue";

const props = defineProps<{
  candidateName: string
  subtitle: string
  items: Array<{ score: number | null, key: string, label: string, tag: string, rationale: string, sources: string[] }>
}>();
const openKey = ref(null);

const avgScore = computed(() => {
  const nums = props.items.map(i => (typeof i.score === "number" ? i.score : 0));
  const sum = nums.reduce((a, b) => a + b, 0);
  return nums.length ? sum / nums.length : 0;
});

const avgLabel = computed(() => {
  if (avgScore.value >= 2.5) return "High";
  if (avgScore.value >= 1.5) return "Moderate";
  if (avgScore.value >= 0.5) return "Low";
  return "Very low";
});

function toggle(key) {
  openKey.value = openKey.value === key ? null : key;
}
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white shadow-sm p-2">
    <div class="p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-slate-900">{{ candidateName }}</h2>
          <p v-if="subtitle" class="mt-1 text-sm text-slate-600">{{ subtitle }}</p>
        </div>
        <div class="text-right">
          <div class="text-xs text-slate-500">Average alignment</div>
          <div class="mt-1 inline-flex items-center gap-2">
            <span class="text-sm font-semibold text-slate-900">{{ avgLabel }}</span>
            <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700 ring-1 ring-slate-200">{{ avgScore.toFixed(1) }}/3</span>
          </div>
        </div>
      </div>

      <div class="mt-5 space-y-3">
        <AlignmentRow
            v-for="item in items"
            :key="item.key"
            :label="item.label"
            :score="item.score || 0"
            :tag="item.tag"
            :open="openKey === item.key"
            :rationale="item.rationale"
            :sources="item.sources"
            @toggle="toggle(item.key)"
        />
      </div>
    </div>
  </section></template>
