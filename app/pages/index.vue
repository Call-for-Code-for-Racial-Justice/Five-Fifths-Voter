<template>
  <div>
    <home-header />
    <home-top-section />
    <!-- TODO: Move to component -->
    <section
      id="our-mission"
      class="flex h-dvh w-full justify-between justify-items-center gap-2 bg-ff-white-01"
    >
      <div
        class="m:block hidden h-full w-[20%] bg-[url(@/assets/images/oval-purple-left.svg)]
          bg-right bg-no-repeat"
      ></div>
      <div
        class="flex h-full items-center justify-items-center
          bg-[url(@/assets/images/oval-purple.svg)] bg-cover bg-center bg-no-repeat
          md:bg-contain"
      >
        <div class="flex w-full flex-col items-center justify-around">
          <h1
            class="mt-10 p-4 text-center text-6xl text-ff-orange-01 md:mt-0 md:text-8xl"
          >
            Our mission
          </h1>
          <p class="text-1xl w-[80%] p-4 text-center text-white md:text-2xl">
            With Five Fifths Voter, we help put the power back in your hands.
            Our platform provides a personalized experience with useful tools to
            help marginalized voters overcome voting process roadblocks.
          </p>
          <p class="text-1xl w-[80%] p-4 text-center text-white md:text-2xl">
            Five Fifths Voter takes into account various voting journeys, such
            as first-time voters, veterans, minorities, legally disabled, the
            elderly, or those with felony convictions.
          </p>
          <button
            class="bg-ff-purple-01 p-3 text-2xl text-white"
            @click="router.replace({ name: 'journey' })"
          >
            Your Voter Journey
            <arrow-up-right class="inline-block" />
          </button>
        </div>
      </div>
      <div
        class="m:block hidden h-full w-[20%] bg-[url(@/assets/images/oval-purple-right.svg)]
          bg-left bg-no-repeat"
      ></div>
    </section>
    <home-values-section />
  </div>
</template>

<script setup>
import { ArrowUpRight32 as ArrowUpRight } from "@carbon/icons-vue";
import HomeHeader from "~/components/Home/Header.vue";

defineOptions({
  name: "HomePage",
});

definePageMeta({
  layout: "special",
});

const router = useRouter();
</script>
<style scoped lang="scss"></style>
