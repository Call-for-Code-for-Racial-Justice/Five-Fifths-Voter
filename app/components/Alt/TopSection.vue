<script setup lang="ts">
import { ArrowUpRight32 as ArrowUpRight } from "@carbon/icons-vue";
import { useElementVisibility } from "@vueuse/core";

const section = useTemplateRef("section");
const isVisible = useElementVisibility(section);

const emit = defineEmits<{ (e: "visibilityChange", isVisible: boolean): void }>();

watchEffect(() => {
  emit("visibilityChange", isVisible.value);
});
</script>

<template>
  <section
      id="top"
      ref="section"
      class="ml-3 h-dvh pt-52 3xl:pt-56"
  >
    <div class="mb-16 w-full px-2 pt-0 text-white">
      <div
          class="whitespace-break-spaces text-5xl sm:text-6xl 2xl:text-8xl"
      >
        {{ $t('landingTopTagline') }}
      </div>
      <div
          class="mt-4 max-w-96 text-2xl sm:mt-8 sm:text-3xl 2xl:max-w-2xl 2xl:text-4xl"
      >
        {{ $t("landingTopDesc") }}
      </div>
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
