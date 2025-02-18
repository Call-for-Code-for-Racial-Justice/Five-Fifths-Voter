<script setup>
defineOptions({
  name: "HomeValuesSection",
});
const expandedCard = ref("");
provide("expanded-card", expandedCard);
</script>

<template>
  <section
    id="our-values"
    class="h-screen w-full bg-ff-blue-01 pt-12"
  >
    <div class="mx-auto w-[99%] md:w-[90%]">
      <h1 class="py-10 text-5xl font-semibold text-ff-blue-03 md:text-6xl">
        Our values
      </h1>
      <div class="m-2 max-w-[1300px] space-y-2">
        <home-values-card
          id="card-educate"
          :name="$t('landingPageEdu')"
          image="educate"
          :main="$t('landingPageEduDesc', ['Five Fifths Voter'])"
          :quote="$t('quoteFrancisBacon')"
          author="Francis Bacon"
          :expand="true"
        />
        <home-values-card
          id="card-empower"
          :name="$t('landingPageEmpower')"
          image="empower"
          :main="$t('landingPageEmpowerDesc', ['Five Fifths Voter'])"
          :quote="$t('quoteCharlotteBronte')"
          author="Charlotte Brontë"
        />
        <home-values-card
          id="card-enable"
          :name="$t('landingPageEnable')"
          image="enable"
          :main="$t('landingPageEnableDesc', ['Five Fifths Voter'])"
          :quote="$t('quotePaulRepetto')"
          author="Paul Repetto"
        />
      </div>
    </div>
  </section>
</template>
