<script setup>
const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale || "en",
  },
});
const { t } = useI18n();
/** @type {Array<SubPage>} */
const subPages = ref([
  {
    page: "register",
    label: t("journeyPageRegisteredLabel"),
  },
  {
    page: "mailInBallot",
    label: t("journeyPageBallotLabel"),
  },
  {
    page: "getInformed",
    label: t("journeyPageGetInformedLabel"),
  },
  {
    page: "voteInPerson",
    label: t("journeyPageVoteNowLabel"),
  },
  {
    page: "ballotReturn",
    label: t("journeyPageDeliverLabel"),
  },
]);
const user = useUser();
onMounted(() => {
  loadApproxLocation();
});
const route = useRoute();
const currentSub = computed(() => {
  return route.path.split("/").slice(-1)[0];
});
</script>

<template>
  <div>
    <ClientOnly>
      <TheHeader />
      <SubNav
        :current="currentSub"
        :sub-pages="subPages"
        prefix="/journey"
      />
      <main
        id="#main-content"
        class="main-content with-header"
      >
        <div class="current-location mt-16">
          {{
            $t("journeyPageElectionState", {
              state: user?.info?.location?.region,
            })
          }}
        </div>
        <JourneySelectState />
        <cv-grid class="mt-0 lg:-mt-12">
          <cv-row>
            <cv-column :lg="16">
              <slot />
            </cv-column>
          </cv-row>
        </cv-grid>
      </main>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.with-header {
  margin-top: 6rem;
  margin-left: 1rem;
}
body {
  margin: unset;
  overflow: auto;
}
</style>
