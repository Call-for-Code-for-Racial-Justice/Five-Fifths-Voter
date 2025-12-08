<script setup>
import titleLogoUrl from "assets/images/five-fifths-voter.svg";
import facesUrl from "assets/images/mask-group.svg";
import { computed, ref, watch } from "vue";
import { useDebounceFn, useMediaQuery, useScroll } from "@vueuse/core";
import { Menu } from "lucide-vue-next";
import { InstagramIcon, GitHubIcon } from "vue3-simple-icons";
import { useRoute } from "vue-router";

defineProps({
  navSection: { type: String, required: true },
});
// Constants
const route = useRoute();
const minHeight = 64;
const isSmallScreen = useMediaQuery("(max-width: 640px)");
const maxHeight = computed(() => ((isSmallScreen.value || !route.meta.shrinkingBanner) ? 64 : 320));
const bounceExtra = 40; // max zoom-out amount
const bounceDecayMs = 250; // how quickly it settles back

// Scroll tracking
const { y: scrollY, directions } = useScroll(window);

// The core reactive header height
const headerHeight = ref(maxHeight.value);

// Track if the header is fully collapsed
const snapped = ref(false);

/*
  Compute target height based on scroll amount:
  - Shrinks normally down to 48
  - If scrolling up fast, allow bounce up to maxHeight + bounceExtra
*/
const targetHeight = computed(() => {
  const shrinkHeight = maxHeight.value - scrollY.value;

  // collapse has snapped
  if (shrinkHeight <= minHeight) return minHeight;

  // expanding: apply bounce
  if (directions.top) {
    return Math.min(
      maxHeight.value + bounceExtra,
      shrinkHeight + bounceExtra * 0.25,
    );
  }

  return Math.min(maxHeight.value, shrinkHeight);
});

// Smoothly decay the overshoot bounce back to maxHeight
const decayBounce = useDebounceFn(() => {
  if (headerHeight.value > maxHeight.value) {
    headerHeight.value = maxHeight.value;
  }
}, bounceDecayMs);

// Apply snapping and easing
watch(targetHeight, (h) => {
  // If we hit the min height threshold, snap
  if (h <= minHeight) {
    if (!snapped.value) {
      snapped.value = true;
      headerHeight.value = minHeight;
    }
  }
  else {
    snapped.value = false;
    headerHeight.value = h;
  }

  // If we overshoot (bounce), schedule correction
  if (headerHeight.value > maxHeight.value) decayBounce();
});

const isHome = computed(() => route.name === "index");
function scrollToId(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  document.activeElement.blur();
}
</script>

<template>
  <nav
      class="navbar fixed top-0 left-0 pb-0 z-20 w-full bg-ff-purple-01 text-neutral-content transition-all duration-300 ease-out items-start"
      :style="{ height: headerHeight + 'px' }"
  >
    <!-- LEFT: hamburger + Five Fifths Voter text -->
    <div class="navbar-start gap-4 pl-2 items-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-square"> <Menu /></div>
        <ul v-if="isHome" tabindex="-1" class="dropdown-content menu text-base-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li @click="scrollToId('top')"><a>{{ $t("appHeaderHome") }}</a></li>
          <li @click="scrollToId('mission')"><a>{{ $t("landingPageMain") }}</a></li>
          <li @click="scrollToId('values')"><a>{{ $t("appHeaderOurValues") }}</a></li>
        </ul>
        <ul v-else tabindex="-1" class="dropdown-content menu text-base-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><NuxtLink to="/journey">{{ $t("appHeaderVoterJourney") }}</NuxtLink></li>
          <li><NuxtLink to="/voterSupport">{{ $t("appHeaderVoterSupport") }}</NuxtLink></li>
          <li><NuxtLink to="/whyVote">{{ $t("appHeaderWhyVote") }}</NuxtLink></li>
        </ul>
      </div>

      <NuxtLink to="/" class="self-center">
        <img
            :src="titleLogoUrl"
            alt="Five Fifths Voter"
            class="object-contain transition-all duration-300 ease-out"
            :style="{
          height: headerHeight * 0.4 + 'px',
        }"
        >
      </NuxtLink>
    </div>
    <div class="navbar-center">

    </div>

    <!-- RIGHT: profile mask group -->
    <div class="navbar-end relative h-full flex items-end">
      <a
          class="btn btn-ghost btn-square self-start" href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Five Fifths Voter on instagram - link opens in a new window"
      >
        <InstagramIcon/>
      </a>
      <a
          class="btn btn-ghost btn-square self-start"
          href="https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Link to code for this site in GitHub - link opens in a new window"
      >
        <GitHubIcon/>
      </a>
      <LanguagePanel class="self-start"/>

      <img
          :src="facesUrl"
          alt=""
          class="ml-2 transition-all duration-300 ease-out object-contain"
          :style="{
          height: headerHeight + 'px',
          bottom: '0px',
        }"
      >
    </div>
  </nav>
</template>
