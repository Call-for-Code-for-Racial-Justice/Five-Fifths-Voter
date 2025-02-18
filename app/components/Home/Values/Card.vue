<script setup>
import {
  ArrowUpRight20 as ArrowUpRight,
  Add20 as ExpandIcon,
  Subtract20 as CollapseIcon,
} from "@carbon/icons-vue";
const props = defineProps({
  name: { type: String, required: true },
  main: { type: String, required: true },
  quote: { type: String, required: true },
  author: { type: String, required: true },
  id: { type: String, required: true },
  image: { type: String, default: "empower" },
  expand: { type: Boolean, default: false },
});

const expandedCard = inject("expanded-card", ref(""));
const expanded = ref(props.expand);
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

<template>
  <div
    class="group flex flex-col gap-2 border border-solid border-white p-5 text-white
      transition-all"
    :class="{
      'is-expanded border-0 bg-ff-blue-03': expanded,
    }"
    tabindex="-1"
  >
    <div
      class="flex cursor-pointer items-center justify-between"
      @click="toggle()"
    >
      <span
        class="text-2xl text-ff-purple-01 data-[expanded=true]:text-white"
        :data-expanded="expanded"
      >
        {{ name }}
      </span>
      <button
        class="relative"
        :aria-expanded="expanded"
        :aria-controls="id"
        tabindex="1"
        :aria-label="name"
      >
        <expand-icon
          class="absolute -translate-x-full -translate-y-1/2 opacity-100 transition-all
            group-[.is-expanded]:opacity-0 group-[.is-expanded]:duration-1000"
        />
        <collapse-icon
          class="absolute -translate-x-full -translate-y-1/2 opacity-0 transition-all
            group-[.is-expanded]:opacity-100 group-[.is-expanded]:duration-1000"
        />
      </button>
    </div>
    <div
      :id="id"
      class="invisible h-auto max-h-0 items-center opacity-0 transition-all
        group-[.is-expanded]:visible group-[.is-expanded]:max-h-screen
        group-[.is-expanded]:opacity-100 group-[.is-expanded]:duration-1000
        data-[expanded=true]:visible data-[expanded=true]:max-h-screen
        data-[expanded=true]:opacity-100"
      role="region"
      :aria-label="name"
    >
      <div class="-mx-4 mb-3 text-ff-white-01 md:text-2xl xl:hidden">
        <div>
          <span class="text-3xl">&#x201c; </span>{{ quote }} &#x2014;
          {{ author }}
        </div>
      </div>
      <div class="flex flex-col justify-around gap-10 md:flex-row md:gap-0">
        <div class="w:full md:w-1/3 md:text-2xl">
          {{ main }}
          <button
            class="mt-10 block bg-ff-purple-01 p-3 text-base text-white"
            @click="navigateTo('/journey')"
          >
            {{ $t("journeyPageTitle") }}
            <arrow-up-right class="inline-block" />
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
          <div class="hidden backdrop-blur-sm xl:block">
            <div class="relative inline">
              <span
                class="absolute translate-x-[-230px] translate-y-[-20px] text-9xl text-ff-yellow-01"
              >&#8220;</span>
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
