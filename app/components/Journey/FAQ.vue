<script setup lang="js">
defineProps({
  question: { type: String, required: true },
  answer: { type: Boolean, required: true },
});
</script>

<template>
  <div
      class="mt-2 text-base"
  >
    <span>{{ question }}</span>
    <span class="ml-2 text-xl text-ff-yellow-01">{{ answer ? $t("yes") : $t("no") }}</span>
    <slot/>
  </div>
</template>
