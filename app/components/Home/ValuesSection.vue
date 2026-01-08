<script setup lang="ts">
import { ArrowUpRight as ArrowUpRight } from "lucide-vue-next";
import { useElementVisibility } from "@vueuse/core";

const section = useTemplateRef("section");
const isVisible = useElementVisibility(section);

const emit = defineEmits<{ (e: "visibilityChange", isVisible: boolean): void }>();

watchEffect(() => {
  emit("visibilityChange", isVisible.value);
});

// Carbon accordion replaced with DaisyUI collapse components.
</script>

<template>
  <section
      id="values"
      ref="section"
      class="ml-3 h-dvh [@media(max-height:568px)]:h-auto pt-24 3xl:pt-56"
  >
    <h1 class="mb-4 px-2 text-5xl sm:text-6xl 2xl:text-8xl">
      {{ $t("appHeaderOurValues") }}
    </h1>
    <div class="space-y-3">
      <div class="collapse collapse-arrow bg-base-200 border border-base-300">
        <input type="radio" name="values-accordion" checked="checked" >
        <div class="collapse-title sm:text-lg font-semibold" aria-controls=item-education>
          {{ $t('landingPageEdu') }}
        </div>
        <div id="item-education" class="collapse-content text-sm md:text-base" >
          <div class="mb-4">
            <span class="text-3xl">&#x201c; </span>{{ $t('quoteFrancisBacon') }} &#x2014;
            Francis Bacon
          </div>
          <div class="w-full text-lg">
            {{ $t('landingPageEduDesc', ['Five Fifths Voter']) }}
          </div>
        </div>
      </div>

      <div class="collapse collapse-arrow bg-base-200 border border-base-300">
        <input type="radio" name="values-accordion">
        <div class="collapse-title sm:text-lg font-semibold" aria-controls=item-empower>
          {{ $t('landingPageEmpower') }}
        </div>
        <div class="collapse-content text-sm md:text-base">
          <div class="mb-4">
            <span id="item-empower" class="text-3xl">&#x201c; </span>{{ $t('quoteCharlotteBronte') }} &#x2014;
            Charlotte Brontë
          </div>
          <div class="w-full text-lg">
            {{ $t('landingPageEmpowerDesc', ['Five Fifths Voter']) }}
          </div>
        </div>
      </div>

      <div class="collapse collapse-arrow bg-base-200 border border-base-300">
        <input type="radio" name="values-accordion">
        <div class="collapse-title sm:text-lg font-semibold" aria-controls=item-enable>
          {{ $t('landingPageEnable') }}
        </div>
        <div class="collapse-content text-sm md:text-base">
          <div class="mb-4">
            <span id="item-enable" class="text-3xl">&#x201c; </span>{{ $t('quotePaulRepetto') }} &#x2014;
            Paul Repetto
          </div>
          <div class="w-full text-lg">
            {{ $t('landingPageEnableDesc', ['Five Fifths Voter']) }}
          </div>
        </div>
      </div>
    </div>
    <button
        id="values-journey-button"
        class="btn btn-primary lg:btn-xl mt-8"
        @click="navigateTo('/journey')"
    >
      <span class="md:text-lg">{{ $t("appHeaderVoterJourney") }}</span>
      <ArrowUpRight class="inline-block" />
    </button>
  </section>
</template>

<style scoped lang="css">

</style>
