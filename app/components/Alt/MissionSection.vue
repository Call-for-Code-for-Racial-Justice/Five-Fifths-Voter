<script setup lang="ts">
import { ArrowUpRight32 as ArrowUpRight } from "@carbon/icons-vue";
import { useElementVisibility } from "@vueuse/core";

const section = useTemplateRef("section");
const isVisible = useElementVisibility(section);

const emit = defineEmits<{ (e: "visibilityChange", isVisible: boolean): void }>();

watchEffect(() => {
  emit("visibilityChange", isVisible.value);
}); </script>

<template>
  <section
      id="mission"
      class="ml-3 h-dvh pt-24 3xl:pt-56"
  >
    <h1
        class="mb-4 px-2 text-5xl text-ff-white-01 sm:text-6xl 2xl:text-8xl"
    >
      {{ $t("landingPageMain") }}
    </h1>
    <div
        ref="section"
        class="mb-8 whitespace-break-spaces px-2 leading-5 text-white sm:text-lg 2xl:text-2xl">
      {{ $t("landingPageMission") }}
    </div>
    <button
        id="mission-journey-button"
        class="ml-2 bg-ff-purple-02 p-3 text-white"
        @click="navigateTo('/journey')"
    >
      <span class="md:text-lg">{{ $t("appHeaderVoterJourney") }}</span>
      <ArrowUpRight class="inline-block" />
    </button>
  </section>

</template>

<style scoped lang="css">

</style>
