<script setup lang="ts">
import { ExternalLinkIcon } from "lucide-vue-next";

defineProps({
  href: { type: String, required: true },
});
</script>
<template>
  <div>
    <a
      class="link link-hover mb-2"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        <slot/>
      </span>
      <ExternalLinkIcon class="inline-block ml-1 size-4" />
    </a>
  </div>
</template>
