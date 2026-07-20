<script setup lang="ts">
import { ArrowUpRight as ArrowUpRight } from "lucide-vue-next";
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
      class="ml-3 pt-32"
  >
    <h1
        class="mb-4 px-2 text-5xl font-bold"
    >
      {{ $t("landingPageMain") }}
    </h1>
    <div
        ref="section"
        class="whitespace-break-spaces px-2 leading-5 sm:text-lg 2xl:text-2xl">
      {{ $t("landingPageMission") }}
    </div>
    <button
        id="mission-journey-button"
        class="btn btn-primary lg:btn-xl mt-16"
        @click="navigateTo('/journey')"
    >
      <span class="md:text-lg">{{ $t("appHeaderVoterJourney") }}</span>
      <ArrowUpRight class="inline-block" />
    </button>
  </section>

</template>

<style scoped lang="css">

</style>
