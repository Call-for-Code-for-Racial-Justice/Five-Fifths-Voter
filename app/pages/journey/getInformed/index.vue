<script setup lang="ts">
definePageMeta({
  subnavigation: "journey",
});
</script>

<template>
  <div>
    <PageTitle>
      {{ $t("journeyPageGetInformedLabel") }}
    </PageTitle>
    <p class="text-center">{{ $t("getInformedTitle") }}</p>
    <JourneyInformedDashboard/>
  </div>
</template>
