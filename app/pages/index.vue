<script setup>
definePageMeta({
  layout: "special",
});

const topSectionIsVisible = ref(true);
const missionSectionIsVisible = ref(false);
const valuesSectionIsVisible = ref(false);

const navSection = computed(() => {
  if (valuesSectionIsVisible.value) return "values";
  else if (missionSectionIsVisible.value) return "mission";
  else if (topSectionIsVisible.value) return "top";
  return null;
});
</script>

<template>
  <div
    class="relative"
  >
    <HomeHeader :nav-section="navSection"/>
    <HomeTopSection @visibility-change="(isVisible) => topSectionIsVisible=isVisible"/>
    <HomeMissionSection @visibility-change="(isVisible) => missionSectionIsVisible=isVisible"/>
    <HomeValuesSection @visibility-change="(isVisible) => valuesSectionIsVisible=isVisible"/>
    <HomeCountdownContainer />
  </div>
</template>

<style lang="css" scoped>

</style>
