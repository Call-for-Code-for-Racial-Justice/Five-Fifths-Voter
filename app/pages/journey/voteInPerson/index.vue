<script setup>
onMounted(() => {
  loadApproxLocation();
});
definePageMeta({
  layout: "journey",
});
</script>

<template>
  <JourneyVoteInPerson />
</template>
