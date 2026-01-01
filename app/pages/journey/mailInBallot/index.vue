<script setup lang="ts">
definePageMeta({
  subnavigation: "journey",
});

</script>

<template>
  <div>
    <PageTitle>
      {{ $t("absenteeTitle") }}
    </PageTitle>
    <p class="text-center">{{ $t("absenteeDesc") }}</p>
    <JourneyMailInDashboard/>
  </div>
</template>
