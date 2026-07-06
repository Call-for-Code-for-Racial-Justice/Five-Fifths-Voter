<script setup lang="ts">
definePageMeta({
  middleware: (to) => {
    const electionId = to.params.electionId as string;
    const candidateId = to.params.id as string;

    return navigateTo(
      `/journey/election/${electionId}/candidates/r/score/${candidateId}`,
      { redirectCode: 301 },
    );
  },
});
</script>

<template>
  <div />
</template>
