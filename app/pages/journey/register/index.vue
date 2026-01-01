<script setup>
definePageMeta({
  subnavigation: "journey",
});
</script>

<template>
  <div>
    <PageTitle>
      {{ $t("registerTitle") }}
    </PageTitle>
    <p class="text-center">{{ $t("registerDesc") }}</p>
    <JourneyRegisterDashboard/>
  </div>
</template>
