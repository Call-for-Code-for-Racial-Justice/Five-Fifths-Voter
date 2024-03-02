<template>
  <div
    ref="el"
    class="group flex flex-col gap-2 rounded-lg bg-ff-blue-03 p-5 text-white"
    :class="{ 'is-expanded': expanded }"
    tabindex="1"
  >
    <div
      class="flex cursor-pointer items-center justify-between"
      @click="toggle()"
    >
      <span class="text-2xl"> {{ name }} </span>
      <button class="relative">
        <expand-icon
          class="absolute -translate-x-[100%] -translate-y-[50%] opacity-100 transition-all
            group-[.is-expanded]:opacity-0 group-[.is-expanded]:duration-1000"
        />
        <collapse-icon
          class="absolute -translate-x-[100%] -translate-y-[50%] opacity-0 transition-all
            group-[.is-expanded]:opacity-100 group-[.is-expanded]:duration-1000"
        />
      </button>
    </div>
    <div
      class="invisible h-auto max-h-0 items-center opacity-0 transition-all
        group-[.is-expanded]:visible group-[.is-expanded]:max-h-screen
        group-[.is-expanded]:opacity-100 group-[.is-expanded]:duration-1000
        data-[expanded=true]:visible data-[expanded=true]:max-h-screen
        data-[expanded=true]:opacity-100"
    >
      <div class="flex flex-col justify-around gap-10 md:flex-row md:gap-0">
        <div class="w:full md:w-1/3 md:text-2xl">
          {{ main }}
          <button
            class="mt-10 block bg-ff-purple-01 p-3 text-white md:text-2xl"
          >
            <cv-link href="/Journey"
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
          class="h-[350px] w-full max-w-[350px] bg-cover bg-center md:w-[350px]"
        >
          <div class="bg-black bg-opacity-60 md:bg-opacity-0">
            <div class="relative inline">
              <span
                class="absolute -translate-x-[230px] -translate-y-[20px] text-9xl text-ff-yellow-01"
                >&#8220;</span
              >
            </div>
            <span
              class="w-full align-top text-2xl font-bold italic md:ml-[-50%] md:inline-block
                md:w-[360px] md:text-3xl"
            >
              {{ quote }}
            </span>
            <div class="text-1xl pt-2 md:ml-[-50%] md:text-2xl md:font-light">
              {{ author }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowUpRight32 as ArrowUpRight,
  Add20 as ExpandIcon,
  Subtract20 as CollapseIcon,
} from "@carbon/icons-vue";
defineOptions({
  name: "HomeValuesCard",
});
const props = defineProps({
  name: { type: String, required: true },
  main: { type: String, required: true },
  quote: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, default: "empower" },
});

const expandedCard = inject("expanded-card", ref(""));
const expanded = ref(false);
const el = ref(null);
function toggle() {
  expanded.value = !expanded.value;
  if (expanded.value) expandedCard.value = props.image;
}
watch(
  expandedCard,
  () => {
    if (expandedCard.value && expandedCard.value !== props.image) {
      setTimeout(() => (expanded.value = false), 250);
    }
  },
  { flush: "post" },
);
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
