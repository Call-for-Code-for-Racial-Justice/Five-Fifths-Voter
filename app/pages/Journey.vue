<template>
  <div class="voter-journey">
    <div class="current-location">
      Election information for {{ user?.info?.location?.region }}
    </div>
    <journey-select-state />
    <cv-accordion @change="onChange">
      <cv-accordion-item
        id="registeredSection"
        v-model:open="registeredSectionOpen"
      >
        <template #title> {{ $t("journeyPageRegisteredLabel") }}</template>
        <template #content>
          <journey-register-to-vote />
        </template>
      </cv-accordion-item>
      <cv-accordion-item id="ballotSection" v-model:open="ballotSectionOpen">
        <template #title> {{ $t("journeyPageBallotLabel") }}</template>
        <template #content>
          <journey-mail-in-ballot />
        </template>
      </cv-accordion-item>
      <cv-accordion-item
        id="informedSection"
        v-model:open="informedSectionOpen"
      >
        <template #title> {{ $t("journeyPageGetInformedLabel") }}</template>
        <template #content>
          <journey-get-informed />
        </template>
      </cv-accordion-item>
      <cv-accordion-item id="voteSection" v-model:open="voteSectionOpen">
        <template #title> {{ $t("journeyPageVoteNowLabel") }}</template>
        <template #content>
          <journey-vote-in-person />
        </template>
      </cv-accordion-item>
      <cv-accordion-item id="deliverSection" v-model:open="deliverSectionOpen">
        <template #title> {{ $t("journeyPageDeliverLabel") }}</template>
        <template #content>
          <journey-ballot-return />
        </template>
      </cv-accordion-item>
    </cv-accordion>
  </div>
</template>

<script setup>
defineOptions({
  name: "JourneyPage",
});
const registeredSectionOpen = ref(false);
const ballotSectionOpen = ref(false);
const informedSectionOpen = ref(false);
const voteSectionOpen = ref(false);
const deliverSectionOpen = ref(false);
const user = useUser();

/**
 * @param {AccordionChangeEvent} ev
 */
function onChange(ev) {
  document.activeElement.blur();
  if (ev.change.open) {
    if (ev.change.id !== "registeredSection")
      setTimeout(() => (registeredSectionOpen.value = false), 250);
    if (ev.change.id !== "ballotSection")
      setTimeout(() => (ballotSectionOpen.value = false), 250);
    if (ev.change.id !== "informedSection")
      setTimeout(() => (informedSectionOpen.value = false), 250);
    if (ev.change.id !== "voteSection")
      setTimeout(() => (voteSectionOpen.value = false), 250);
    if (ev.change.id !== "deliverSection")
      setTimeout(() => (deliverSectionOpen.value = false), 250);
  }
}

onMounted(() => {
  loadApproxLocation();
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.voter-journey {
  margin-top: 8rem;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  max-width: 1346px;
  img {
    max-width: 100px;
  }
  .bx--accordion__item--active {
    background-color: $ff-blue-02;
  }
  .bx--accordion__item {
    border-left: 1px solid #ec9899;
    border-right: 1px solid #ec9899;
  }
  :deep(.bx--accordion__content) {
    padding-right: 3rem;
  }
  .current-location {
    @include type-style("productive-heading-01");
  }
  :deep(a) {
    color: white !important;
  }
}
</style>
