<script setup lang="ts">
definePageMeta({
  shrinkingBanner: true,
});

useHead({
  htmlAttrs: {
    class: "snap-y snap-mandatory scroll-smooth short:snap-none",
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
