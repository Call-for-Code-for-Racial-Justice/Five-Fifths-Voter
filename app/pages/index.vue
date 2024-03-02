<template>
  <div>
    <home-header />
    <section id="top" class="w-full h-dvh mt-[2rem]">
      <div
        class="w-full h-[calc(100%-320px-2rem)] bg-ff-purple-01 bg-repeat-x bg-[url(@/assets/images/silhouette-tile.png)] bg-cover md:bg-contain"
      >
        <div class="p-8">
          <img
            alt="Five Fifths voter"
            src="@/assets/images/five-fifths-voter.svg"
          />
        </div>
        <div class="text-white p-3 md:p-14 h-full w-full">
          <h1 class="text-4xl md:text-6xl">
            Overcoming barriers<br />Amplifying voices
          </h1>
          <div class="text-2xl md:text-2xl pt-10 md:pt-8 md:max-w-96">
            Together, we can change the narrative of historically
            disenfranchised people in our democratic process.
          </div>
        </div>
      </div>
      <home-countdown />
    </section>
    <section
      id="our-mission"
      class="w-full h-dvh bg-ff-white-01 flex justify-between justify-items-center gap-2"
    >
      <div
        class="hidden m:block h-full w-[20%] bg-[url(@/assets/images/oval-purple-left.svg)] bg-right bg-no-repeat"
      ></div>
      <div
        class="h-full bg-[url(@/assets/images/oval-purple.svg)] bg-cover md:bg-contain bg-center bg-no-repeat flex items-center justify-items-center"
      >
        <div class="w-full flex flex-col items-center justify-around">
          <h1
            class="text-ff-orange-01 text-6xl md:text-8xl text-center mt-10 md:mt-0 p-4"
          >
            Our mission
          </h1>
          <p class="text-white text-1xl md:text-2xl text-center p-4 w-[80%]">
            With Five Fifths Voter, we help put the power back in your hands.
            Our platform provides a personalized experience with useful tools to
            help marginalized voters overcome voting process roadblocks.
          </p>
          <p class="text-white text-1xl md:text-2xl text-center p-4 w-[80%]">
            Five Fifths Voter takes into account various voting journeys, such
            as first-time voters, veterans, minorities, legally disabled, the
            elderly, or those with felony convictions.
          </p>
          <button
            class="bg-ff-purple-01 text-2xl p-3 text-white"
            @click="router.replace({ name: 'journey' })"
          >
            Your Voter Journey
            <arrow-up-right class="inline-block" />
          </button>
        </div>
      </div>
      <div
        class="hidden m:block h-full w-[20%] bg-[url(@/assets/images/oval-purple-right.svg)] bg-left bg-no-repeat"
      ></div>
    </section>
    <section id="our-values" class="w-full h-screen bg-ff-blue-01 pt-[3rem]">
      <div class="w-[99%] md:w-[90%] mr-auto ml-auto">
        <h1 class="text-ff-blue-03 text-5xl md:text-6xl p-10">Our values</h1>

        <div class="flex justify-around flex-col gap-10 md:gap-0 md:flex-row">
          <div class="w:full md:w-1/3 md:text-2xl">
            <slot name="main">
              Five Fifths Voter will educate disenfranchised voters with voting
              guidance and connection to up&#x2011;to&#x2011;date tools
              necessary to complete the voting process.
            </slot>
            <button
              class="bg-ff-purple-01 md:text-2xl p-3 text-white block mt-10"
            >
              <cv-link href="/Journey" class="!text-white"
                >Your Voter Journey
                <arrow-up-right class="inline-block" />
              </cv-link>
            </button>
          </div>
          <div
            :class="{
              empower: image === 'empower',
              educate: image === 'educate',
              enable: image === 'enable',
            }"
            class="w-full max-w-[350px] md:w-[350px] h-[350px] bg-cover bg-center"
          >
            <div class="bg-black bg-opacity-30 md:bg-opacity-0">
              <span
                class="text-ff-yellow-01 text-9xl md:ml-[-50%] align-bottom leading-3"
                >&#8220;</span
              >
              <span
                class="text-2xl md:text-3xl w-full md:w-[360px] font-bold italic align-top md:inline-block md:mt-5"
              >
                <slot name="quote"> Knowledge is power. </slot>
              </span>
            </div>
            <div
              class="text-1xl md:text-2xl md:ml-[-50%] md:font-light pl-[60px] mt-2 bg-black bg-opacity-30 md:bg-opacity-0"
            >
              <slot name="author"> Francis Bacon </slot>
            </div>
          </div>
        </div>

        <div class="m-2 space-y-2 max-w-[1300px]">
          <home-values-card name="Educate" image="educate">
            <template #main>
              Five Fifths Voter will educate disenfranchised voters with voting
              guidance and connection to up&#x2011;to&#x2011;date tools
              necessary to complete the voting process.
            </template>
            <template #quote> Knowledge is power </template>
            <template #author> Francis Bacon </template>
          </home-values-card>
          <home-values-card name="Empower" image="empower">
            <template #main>
              Five Fifths Voter will help generate solidarity for
              disenfranchised voting communities and leverage social media
              platforms for easy access to candidate information.
            </template>
            <template #quote>
              I am no bird; and no net ensnares me: I am a free human being with
              an independent will.
            </template>
            <template #author> Charlotte Brontë </template>
          </home-values-card>
          <home-values-card name="Enable" image="enable">
            <template #main>
              Five Fifths Voter enables users with information to get to polling
              stations in safe and efficient ways and will strive to help remove
              roadblocks disenfranchised voters encounter when voting.
            </template>
            <template #quote>
              Enablement is the key to closing the gap between intention and
              action.
            </template>
            <template #author> Paul Repetto </template>
          </home-values-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ArrowUpRight32 as ArrowUpRight } from "@carbon/icons-vue";
import { ChevronDown16 as Chevron } from "@carbon/icons-vue";
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
