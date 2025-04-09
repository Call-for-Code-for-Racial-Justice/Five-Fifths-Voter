<script setup lang="js">
defineProps({
  question: { type: String, required: true },
  answer: { type: Boolean, required: true },
});
</script>

<template>
  <div
      class="text-base mt-2"
  >
    <span>{{ question }}</span>
    <span class="text-xl ml-2 text-ff-yellow-01">{{ answer ? $t("yes") : $t("no") }}</span>
    <slot/>
  </div>
</template>
