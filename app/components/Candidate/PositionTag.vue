<script setup lang="ts">
import taxonomy from "~/assets/data/position-taxonomy.json";

const props = defineProps<{
  position_type: "pos" | "neg" | "mixed" | "none"
  position_tag: string | null
  topic?: string
}>();

const lean = computed(() => {
  if (!props.position_tag) return null;
  for (const entry of taxonomy) {
    const tag = entry.tags.find(t => t.label === props.position_tag);
    if (tag) return tag.lean;
  }
  return null;
});

const badgeClass = computed(() => {
  if (props.position_type === "mixed") return "badge-warning";
  if (props.position_type === "pos") {
    if (lean.value === "left") return "badge-left";
    if (lean.value === "right") return "badge-right";
    return "badge-neutral badge-outline";
  }
  return "badge-ghost text-base-content/40 italic";
});

const label = computed(() => {
  if (props.position_type === "pos" || props.position_type === "mixed") {
    return props.position_tag ?? "";
  }
  return props.topic ? `${props.topic}: no position found` : "No position found";
});
</script>

<template>
  <span class="badge" :class="badgeClass">{{ label }}</span>
</template>
