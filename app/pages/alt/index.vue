<script setup>
import { ArrowUpRight32 as ArrowUpRight } from "@carbon/icons-vue";

defineOptions({
  name: "HomeV3Page",
});

definePageMeta({
  layout: "special",
});
</script>

<template>
  <div>
    <HomeV3Header />
    <HomeV3TopSection />
    <!-- TODO: Move to component -->
    <section
      id="our-mission"
      class="flex h-dvh w-full justify-between justify-items-center gap-2 bg-ff-white-01"
    >
      <div
        class="hidden h-full w-1/5 bg-[url(@/assets/images/oval-purple-left.svg)] bg-right
          bg-no-repeat md:block"
      />
      <div class="flex h-full place-items-center">
        <div
          class="flex h-[90%] flex-col items-center justify-around rounded-full bg-ff-purple-02"
        >
          <h1
            class="mt-10 p-4 text-center text-6xl text-ff-white-01 md:mt-0 md:text-8xl"
          >
            {{ $t("landingPageMain") }}
          </h1>
          <div class="text-1xl p-4 text-center text-white md:text-2xl">
            {{ $t("landingPageMission") }}
          </div>
          <button
            id="mission-journey-button"
            class="bg-ff-purple-01 p-3 text-2xl text-white"
            @click="navigateTo('/journey')"
          >
            {{ $t("appHeaderVoterJourney") }}
            <ArrowUpRight class="inline-block" />
          </button>
        </div>
      </div>
      <div
        class="hidden h-full w-1/5 bg-[url(@/assets/images/oval-purple-right.svg)] bg-left
          bg-no-repeat md:block"
      />
    </section>
    <HomeV3ValuesSection />
  </div>
</template>
