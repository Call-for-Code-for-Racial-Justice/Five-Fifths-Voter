<script setup lang="ts">
definePageMeta({
  subnavigation: "journey",
});
</script>

<template>
  <div>
    <PageTitle>
      {{ $t("journeyPageVoteNowLabel") }}
    </PageTitle>
    <p class="text-center">{{ $t("voteTitle") }}</p>
    <JourneyVoteDashboard/>
  </div>
</template>
