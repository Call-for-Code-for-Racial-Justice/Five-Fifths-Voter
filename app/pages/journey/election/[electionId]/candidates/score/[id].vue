<script setup lang="ts">
const route = useRoute();
const electionId = route.params.electionId as string;
const candidateId = route.params.id as string;

// Redirect old bookmark to new route with raceId 'r'
await navigateTo(`/journey/election/${electionId}/candidates/r/score/${candidateId}`, {
  redirectCode: 301,
});
</script>

<template>
  <div />
</template>
