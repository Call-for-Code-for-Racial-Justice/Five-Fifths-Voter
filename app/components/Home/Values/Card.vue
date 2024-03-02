<template>
  <div
    class="group flex flex-col gap-2 rounded-lg bg-ff-blue-03 p-5 text-white"
    tabindex="1"
  >
    <div class="flex cursor-pointer items-center justify-between">
      <span class="text-2xl"> {{ name }} </span>
      <chevron class="transition-all duration-500 group-focus:-rotate-180" />
    </div>
    <div
      class="visible xinvisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
    >
      <div class="flex justify-around flex-col gap-10 md:gap-0 md:flex-row">
        <div class="w:full md:w-1/3 md:text-2xl">
          <slot name="main">
            Five Fifths Voter will educate disenfranchised voters with voting
            guidance and connection to up&#x2011;to&#x2011;date tools necessary
            to complete the voting process.
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
    </div>
  </div>
</template>

<script setup>
import {
  ArrowUpRight32 as ArrowUpRight,
  ChevronDown16 as Chevron,
} from "@carbon/icons-vue";
defineOptions({
  name: "HomeValuesCard",
});
defineProps({
  name: { type: String, required: true },
  image: { type: String, default: "empower" },
});
</script>

<style scoped lang="scss">
.empower {
  background-image: url(@/assets/images/landing-page-black-woman-orange-image-3.jpeg);
}
.educate {
  background-image: url(@/assets/images/black-woman-vertical.png);
}
.enable {
  background-image: url(@/assets/images/landing-page-disabled-triathlete-image-4.jpeg);
}
</style>
