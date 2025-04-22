<script setup lang="ts">
import { ArrowUpRight32 as ArrowUpRight } from "@carbon/icons-vue";
import { useElementVisibility } from "@vueuse/core";

const section = useTemplateRef("section");
const isVisible = useElementVisibility(section);

const emit = defineEmits<{ (e: "visibilityChange", isVisible: boolean): void }>();

watchEffect(() => {
  emit("visibilityChange", isVisible.value);
});

const isEduOpen = ref(true);
const isEmpowerOpen = ref(false);
const isEnableOpen = ref(false);
function autoClose(ev) {
  if (ev.change.open) {
    const openItem = ev.change.id.split("-").slice(-1)[0];
    if (openItem === "education") {
      isEmpowerOpen.value = false;
      isEnableOpen.value = false;
    }
    else if (openItem === "empower") {
      isEnableOpen.value = false;
      isEduOpen.value = false;
    }
    else if (openItem === "enable") {
      isEmpowerOpen.value = false;
      isEduOpen.value = false;
    }
  }
}
</script>

<template>
  <section
      id="values"
      class="ml-3 h-dvh pt-24 3xl:pt-56"
  >
    <h1 class="mb-4 px-2 text-5xl sm:text-6xl 2xl:text-8xl">
      {{ $t("appHeaderOurValues") }}
    </h1>
    <cv-accordion
        ref="section"
        @change="autoClose">
      <cv-accordion-item
          id="item-education"
          v-model:open="isEduOpen"
      >
        <template #title>
          <div class="sm:text-lg">
            {{ $t('landingPageEdu') }}
          </div>
        </template>
        <template #content>
          <div class="mb-4">
            <span class="text-3xl">&#x201c; </span>{{ $t('quoteFrancisBacon') }} &#x2014;
            Francis Bacon
          </div>
          <div class="w:full text-lg">
            {{ $t('landingPageEduDesc', ['Five Fifths Voter']) }}
          </div>
        </template>
      </cv-accordion-item>
      <cv-accordion-item
          id="item-empower"
          v-model:open="isEmpowerOpen"
      >
        <template #title>
          <div class="sm:text-lg">
            {{ $t('landingPageEmpower') }}
          </div>
        </template>
        <template #content>
          <div class="mb-4">
            <span class="text-3xl">&#x201c; </span>{{ $t('quoteCharlotteBronte') }} &#x2014;
            Charlotte Brontë
          </div>
          <div class="w:full text-lg">
            {{ $t('landingPageEmpowerDesc', ['Five Fifths Voter']) }}
          </div>
        </template>
      </cv-accordion-item>
      <cv-accordion-item
          id="item-enable"
          v-model:open="isEnableOpen"
      >
        <template #title>
          <div class="sm:text-lg">
            {{ $t('landingPageEnable') }}
          </div>
        </template>
        <template #content>
          <div class="mb-4">
            <span class="text-3xl">&#x201c; </span>{{ $t('quotePaulRepetto') }} &#x2014;
            Paul Repetto
          </div>
          <div class="w-full text-lg">
            {{ $t('landingPageEnableDesc', ['Five Fifths Voter']) }}
          </div>
        </template>
      </cv-accordion-item>
    </cv-accordion>
    <button
        id="mission-journey-button"
        class="ml-2 mt-8 bg-ff-purple-02 p-3 text-white"
        @click="navigateTo('/journey')"
    >
      <span class="md:text-lg">{{ $t("appHeaderVoterJourney") }}</span>
      <ArrowUpRight class="inline-block" />
    </button>
  </section>
</template>

<style scoped lang="css">

</style>
