<script setup lang="ts">
import taxonomy from "~/assets/data/position-taxonomy.json";

const props = defineProps<{
  positionType: "pos" | "neg" | "mixed" | "none"
  positionTag: string | null
  topic?: string
}>();

const lean = computed(() => {
  if (!props.positionTag) return null;
  for (const entry of taxonomy) {
    const tag = entry.tags.find(t => t.label === props.positionTag);
    if (tag) return tag.lean;
  }
  return null;
});

const badgeClass = computed(() => {
  if (props.positionType === "mixed") return "badge-middle";
  if (props.positionType === "pos") {
    if (lean.value === "left") return "badge-left";
    if (lean.value === "right") return "badge-right";
    return "badge-middle";
  }
  return "badge-ghost text-base-content/40 italic";
});

const label = computed(() => {
  if (props.positionType === "pos" || props.positionType === "mixed") {
    return props.positionTag ?? "";
  }
  return props.topic ? `${props.topic}` : "No position found";
});
</script>

<template>
  <span class="badge" :class="badgeClass">{{ label }}</span>
</template>
