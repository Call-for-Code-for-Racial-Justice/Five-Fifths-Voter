<template>
  <div class="snap-always">
    <section id="top" :class="['w-full', 'h-dvh', 'snap-start']">
      <div
        class="w-full h-[calc(100%-320px)] bg-ff-purple-01 bg-repeat-x bg-[url(@/assets/images/silhouette-tile.png)] bg-cover md:bg-contain'"
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
            <cv-link href="/Journey"
              >Your Voter Journey
              <arrow-up-right class="inline-block" />
            </cv-link>
          </button>
        </div>
      </div>
      <div
        class="hidden m:block h-full w-[20%] bg-[url(@/assets/images/oval-purple-right.svg)] bg-left bg-no-repeat"
      ></div>
    </section>
    <section id="our-values" class="w-full h-screen bg-ff-blue-01 snap-start">
      <div class="w-[99%] md:w-[90%] mr-auto ml-auto">
        <h1 class="text-ff-blue-03 text-5xl md:text-6xl p-10">Our values</h1>

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

defineOptions({
  name: "HomePage",
});

definePageMeta({
  layout: "special",
});

const router = useRouter();
</script>
<style scoped lang="scss"></style>
