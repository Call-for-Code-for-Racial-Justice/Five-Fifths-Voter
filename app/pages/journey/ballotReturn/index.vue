<script setup lang="ts">
definePageMeta({
  layout: "journey",
});
</script>

<template>
  <div>
    <PageTitle>
      {{ $t("journeyPageDeliverLabel") }}
    </PageTitle>
    <JourneyDeliverDashboard/>
  </div>
</template>
