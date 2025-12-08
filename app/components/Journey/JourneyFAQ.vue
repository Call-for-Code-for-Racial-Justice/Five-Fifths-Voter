<script setup lang="ts">
import type { Faq } from "~/types/faq";
defineProps<{
  faqs: Faq[]
}>();
const id = useId();
</script>
<template>
  <details
      v-for="faq in faqs"
      :key="faq.question"
      class="collapse bg-base-100 border border-base-300"
      :name="`faq-${id}`"
  >
    <summary class="collapse-title font-semibold">
      <component :is="faq.icon" class="size-5 text-primary"/>
      {{ faq.question }}
    </summary>
    <div class="collapse-content text-sm">
      <p>
        {{ faq.answer }}
      </p>
      <a v-if="faq.link" :href="faq.link" target="_blank" class="link link-primary link-hover">More information</a>
    </div>
  </details>
</template>
