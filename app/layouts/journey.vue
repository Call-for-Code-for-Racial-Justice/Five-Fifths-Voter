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
const route = useRoute();
const currentSub = computed(() => {
  return route.path.split("/").slice(-1)[0];
});
</script>

<template>
  <div>
    <TheHeader />
    <SubNav
      :current="currentSub"
      :sub-pages="subPages"
      prefix="/journey"
    />
    <main id="#main-content" class="main-content with-header">
      <slot />
    </main>
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
