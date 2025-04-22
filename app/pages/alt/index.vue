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
    <AltHeader :nav-section="navSection"/>
    <AltTopSection @visibility-change="(isVisible) => topSectionIsVisible=isVisible"/>
    <AltMissionSection @visibility-change="(isVisible) => missionSectionIsVisible=isVisible"/>
    <AltValuesSection @visibility-change="(isVisible) => valuesSectionIsVisible=isVisible"/>
    <AltCountdownContainer />
  </div>
</template>

<style lang="css" scoped>

</style>
