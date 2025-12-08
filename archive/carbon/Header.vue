<script setup lang="js">
import {
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-vue-next";
import bgUrl from "assets/images/mask-group.svg";
import titleLogoUrl from "assets/images/five-fifths-voter.svg";
import { useWindowScroll, useWindowSize } from "@vueuse/core";

defineProps({
  navSection: { type: String, required: true },
});

const mobileActive = ref(false);
function scrollToId(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  document.activeElement.blur();
  mobileActive.value = false;
}

const { width: screenWidth } = useWindowSize();
const { y } = useWindowScroll();
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
const scaleLogo = computed(() => {
  let baseHeight = 320; // for 3xl use h-80
  if (screenWidth.value < 1536) baseHeight = 208; // for bp smaller than 3xl use height h-52
  return `${baseHeight - (baseHeight - 48) * easeInOutCubic(Math.min(1, y.value / 208))}px`;
});
const scaleFF = computed(() => {
  let baseHeight = 128;
  if (screenWidth.value < 640) baseHeight = 64;
  return `${baseHeight - (baseHeight - 48) * easeInOutCubic(Math.min(1, y.value / 208))}px`;
});
</script>

<template>
  <nav class="fixed left-0 top-0 z-20">
    <Transition name="slide-up">
      <button v-if="mobileActive" class="absolute p-3" @click="mobileActive = false"><CloseIcon /></button>
      <button v-else class="absolute p-3" @click="mobileActive = true"><MenuIcon/></button>
    </Transition>
    <ul v-if="mobileActive" class="z-30 ml-1 mt-12 cursor-pointer border border-solid border-ff-white-01 bg-ff-purple-01 p-2">
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
      class="fixed z-10 h-52 w-full bg-ff-purple-01 bg-contain bg-top-right
        bg-no-repeat 3xl:h-80"
      :class="{'border border-solid border-carbon-gray-90' : scaleLogo === '48px'}"
      :style="{backgroundImage: `url(${bgUrl})`, height: scaleLogo}"
  >
    <div class="float-start ml-6 px-8 py-2" :style="{height: scaleFF}">
      <img
          alt="Five Fifths voter"
          :src="titleLogoUrl"
          class="h-full"
      >
    </div>
  </div>

</template>

<style scoped lang="css">
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
