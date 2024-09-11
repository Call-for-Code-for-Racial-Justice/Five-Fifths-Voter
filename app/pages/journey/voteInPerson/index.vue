<script setup>
onMounted(() => {
  loadApproxLocation();
});
definePageMeta({
  layout: "journey",
});
</script>

<template>
  <journey-vote-in-person />
</template>

<style scoped lang="scss"></style>
