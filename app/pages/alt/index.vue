<script setup>
import { ArrowUpRight32 as ArrowUpRight,
  Menu20 as MenuIcon,
  Close20 as CloseIcon } from "@carbon/icons-vue";
import { useElementVisibility, useWindowScroll, useWindowSize } from "@vueuse/core";
import titleLogoUrl from "~/assets/images/five-fifths-voter.svg";
import bgUrl from "~/assets/images/mask-group.svg";

definePageMeta({
  layout: "special",
});

const mobileActive = ref(false);
function scrollToId(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  document.activeElement.blur();
  mobileActive.value = false;
}

const topSection = useTemplateRef("topSection");
const missionSection = useTemplateRef("missionSection");
const valuesSection = useTemplateRef("valuesSection");
const topSectionIsVisible = useElementVisibility(topSection);
const missionSectionIsVisible = useElementVisibility(missionSection, {
  rootMargin: "-50px 0px -50px 0px",
});
const valuesSectionIsVisible = useElementVisibility(valuesSection, {
  rootMargin: "-50px 0px -50px 0px",
});

const navSection = computed(() => {
  if (valuesSectionIsVisible.value) return "values";
  else if (missionSectionIsVisible.value) return "mission";
  else if (topSectionIsVisible.value) return "top";
  return null;
});

const isEduOpen = ref(true);
const isEmpowerOpen = ref(false);
const isEnableOpen = ref(false);
function autoClose(ev) {
  if (ev.change.open) {
    const openItem = ev.change.id.split("-").slice(-1)[0];
    if (openItem === "education") {
      isEmpowerOpen.value = false;
      isEnableOpen.value = false;
    }
    else if (openItem === "empower") {
      isEnableOpen.value = false;
      isEduOpen.value = false;
    }
    else if (openItem === "enable") {
      isEmpowerOpen.value = false;
      isEduOpen.value = false;
    }
  }
}

// const direction = ref("");
// let lastScrollTop = 0;
// function handleScroll() {
//   const currentScrollTop = window.pageYOffset;
//   if (currentScrollTop > lastScrollTop) direction.value = "down";
//   else direction.value = "up";
//   lastScrollTop = currentScrollTop;
// }
// const handleScrollEnd = useDebounceFn((evt) => {
//   console.log("stopped scrolling!!", evt);
// if (direction.value === "down") scrollToId(navSection.value);
// else {
//   switch (navSection.value) {
//     case "mission":
//       scrollToId("top");
//       break;
//     case "values":
//       scrollToId("mission");
//       break;
//   }
// }
// }, 5000);
// onMounted(() => {
//   addEventListener("scrollend", handleScrollEnd);
// });
// onBeforeUnmount(() => {
//   removeEventListener("scrollend", handleScrollEnd);
// })
// useEventListener(window, "scroll", handleScrollEnd);
// useEventListener(window, "scroll", handleScroll);

const { width: screenWidth } = useWindowSize();
const { y } = useWindowScroll();
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
const scaleLogo = computed(() => {
  let baseHeight = 320;
  if (screenWidth.value < 1536) baseHeight = 208;
  return `${baseHeight - (baseHeight - 48) * easeInOutCubic(Math.min(1, y.value / 208))}px`;
});
const scaleFF = computed(() => {
  let baseHeight = 128;
  if (screenWidth.value < 640) baseHeight = 64;
  return `${baseHeight - (baseHeight - 48) * easeInOutCubic(Math.min(1, y.value / 208))}px`;
});

</script>

<template>
  <div
    class="relative"
  >
    <nav class="fixed left-0 top-0 z-20">
      <Transition name="slide-up">
        <button v-if="mobileActive" class="absolute" @click="mobileActive = false"><CloseIcon /></button>
        <button v-else class="absolute" @click="mobileActive = true"><MenuIcon/></button>
      </Transition>
      <ul v-if="mobileActive" class="z-30 ml-1 mt-8 cursor-pointer border border-solid border-ff-white-01 bg-ff-purple-01 p-2">
        <li
            class="border-l border-solid p-3 hover:border-l-4 sm:p-1 3xl:p-2"
            :class="{'border-ff-purple-02': navSection === 'top',
                   'border-carbon-gray-80': navSection !== 'top'}"
            @click="scrollToId('top')"
        >
          {{ $t("appHeaderHome") }}
        </li>
        <li
            class="border-l border-solid p-3 hover:border-l-4 sm:p-1 3xl:p-2"
            :class="{'border-ff-purple-02': navSection === 'mission',
                   'border-carbon-gray-80': navSection !== 'mission'}"
            @click="scrollToId('mission')"
        >
          {{ $t("landingPageMain") }}
        </li>
        <li
            class="border-l border-solid p-3 hover:border-l-4 sm:p-1 3xl:p-2"
            :class="{'border-ff-purple-02': navSection === 'values',
                   'border-carbon-gray-80': navSection !== 'values'}"
            @click="scrollToId('values')"
        >
          {{ $t("appHeaderOurValues") }}
        </li>
      </ul>
    </nav>
    <nav
      class="fixed left-2 top-20 z-20 hidden cursor-pointer bg-ff-purple-01/90 sm:text-lg 3xl:text-xl"
    >
      <ul>
        <li
          class="border-l border-solid p-3 hover:border-l-4 sm:p-1 3xl:p-2"
          :class="{'border-ff-purple-02': navSection === 'top',
                   'border-carbon-gray-80': navSection !== 'top'}"
          @click="scrollToId('top')"
        >
          {{ $t("appHeaderHome") }}
        </li>
        <li
          class="border-l border-solid p-3 hover:border-l-4 sm:p-1 3xl:p-2"
          :class="{'border-ff-purple-02': navSection === 'mission',
                   'border-carbon-gray-80': navSection !== 'mission'}"
          @click="scrollToId('mission')"
        >
          {{ $t("landingPageMain") }}
        </li>
        <li
          class="border-l border-solid p-3 hover:border-l-4 sm:p-1 3xl:p-2"
          :class="{'border-ff-purple-02': navSection === 'values',
                   'border-carbon-gray-80': navSection !== 'values'}"
          @click="scrollToId('values')"
        >
          {{ $t("appHeaderOurValues") }}
        </li>
      </ul>
    </nav>
    <div
      class="fixed z-10 h-52 w-full bg-ff-purple-01 bg-contain bg-right-top
        bg-no-repeat 3xl:h-56"
      :class="{'border border-solid border-carbon-gray-90' : scaleLogo === '48px'}"
      :style="{backgroundImage: `url(${bgUrl})`, height: scaleLogo}"
    >
      <div class="float-start ml-1 px-8 py-2" :style="{height: scaleFF}">
        <img
          alt="Five Fifths voter"
          :src="titleLogoUrl"
          class="h-full"
        >
      </div>
    </div>
    <section
      id="top"
      ref="topSection"
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
    <section
      id="mission"
      ref="missionSection"
      class="ml-3 h-dvh pt-24 3xl:pt-56"
    >
      <h1
        class="mb-4 px-2 text-5xl text-ff-white-01 sm:text-6xl 2xl:text-8xl"
      >
        {{ $t("landingPageMain") }}
      </h1>
      <div class="mb-8 whitespace-break-spaces px-2 leading-5 text-white sm:text-lg 2xl:text-2xl">
        {{ $t("landingPageMission") }}
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
    <section
      id="values"
      ref="valuesSection"
      class="ml-3 h-dvh pt-24 3xl:pt-56"
    >
      <h1 class="mb-4 px-2 text-5xl sm:text-6xl 2xl:text-8xl">
        {{ $t("appHeaderOurValues") }}
      </h1>
      <cv-accordion @change="autoClose">
        <cv-accordion-item
          id="item-education"
          v-model:open="isEduOpen"
        >
          <template #title>
            <div class="sm:text-lg">
              {{ $t('landingPageEdu') }}
            </div>
          </template>
          <template #content>
            <div class="mb-4">
              <span class="text-3xl">&#x201c; </span>{{ $t('quoteFrancisBacon') }} &#x2014;
              Francis Bacon
            </div>
            <div class="w:full text-lg">
              {{ $t('landingPageEduDesc', ['Five Fifths Voter']) }}
            </div>
          </template>
        </cv-accordion-item>
        <cv-accordion-item
          id="item-empower"
          v-model:open="isEmpowerOpen"
        >
          <template #title>
            <div class="sm:text-lg">
              {{ $t('landingPageEmpower') }}
            </div>
          </template>
          <template #content>
            <div class="mb-4">
              <span class="text-3xl">&#x201c; </span>{{ $t('quoteCharlotteBronte') }} &#x2014;
              Charlotte Brontë
            </div>
            <div class="w:full text-lg">
              {{ $t('landingPageEmpowerDesc', ['Five Fifths Voter']) }}
            </div>
          </template>
        </cv-accordion-item>
        <cv-accordion-item
          id="item-enable"
          v-model:open="isEnableOpen"
        >
          <template #title>
            <div class="sm:text-lg">
              {{ $t('landingPageEnable') }}
            </div>
          </template>
          <template #content>
            <div class="mb-4">
              <span class="text-3xl">&#x201c; </span>{{ $t('quotePaulRepetto') }} &#x2014;
              Paul Repetto
            </div>
            <div class="w-full text-lg">
              {{ $t('landingPageEnableDesc', ['Five Fifths Voter']) }}
            </div>
          </template>
        </cv-accordion-item>
      </cv-accordion>
      <button
        id="mission-journey-button"
        class="ml-2 mt-8 bg-ff-purple-02 p-3 text-white"
        @click="navigateTo('/journey')"
      >
        <span class="md:text-lg">{{ $t("appHeaderVoterJourney") }}</span>
        <ArrowUpRight class="inline-block" />
      </button>
    </section>
    <footer class="sticky bottom-0 h-20 bg-ff-red-01 md:h-28 xl:h-32 3xl:h-64">
      <AltCountdownContainer />
    </footer>
  </div>
</template>

<style lang="css" scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  transform: rotate(45deg);
  opacity: 0;
}

.slide-up-leave-to {
  transform: rotate(-45deg);
  opacity: 0;
}
</style>
