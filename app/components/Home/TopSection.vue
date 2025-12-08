<script setup lang="ts">
import { ArrowUpRight as ArrowUpRight } from "lucide-vue-next";
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
      class="ml-3 h-dvh pt-24 md:pt-84"
  >
    <div class="mb-16 w-full px-2 pt-0">
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
        id="top-journey-button"
        class="btn btn-primary lg:btn-xl"
        @click="navigateTo('/journey')"
    >
      <span class="md:text-lg">{{ $t("appHeaderVoterJourney") }}</span>
      <ArrowUpRight class="inline-block" />
    </button>
  </section>

</template>

<style scoped lang="css">

</style>
