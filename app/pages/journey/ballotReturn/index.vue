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
    <p class="text-center">Drop it off or mail it — here’s how to finish the job</p>
    <JourneyDeliverDashboard/>
  </div>
</template>
