<script setup lang="ts">
definePageMeta({
  shrinkingBanner: true,
});

useHead({
  htmlAttrs: {
    class: "scroll-smooth",
  },
});
</script>

<template>
  <div
    class="relative"
  >
    <HomeTopSection/>
    <HomeMissionSection />
    <HomeValuesSection />
    <HomeCountdownContainer />
  </div>
</template>
