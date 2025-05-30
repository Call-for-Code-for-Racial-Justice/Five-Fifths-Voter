<script setup>
definePageMeta({
  layout: "journey",
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
