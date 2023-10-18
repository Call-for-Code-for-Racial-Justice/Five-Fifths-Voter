<template>
  <div :class="`nav-container active-section-${activeSection}`">
    <svg
      width="677"
      height="157"
      viewBox="0 0 677 157"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1" height="157" fill="currentColor" />
      <rect x="224" y="139" width="1" height="18" fill="currentColor" />
      <rect x="465" y="139" width="1" height="18" fill="currentColor" />
      <rect x="676" y="139" width="1" height="18" fill="currentColor" />
      <rect y="139" width="676" height="1" fill="currentColor" />
    </svg>

    <cv-link
      v-if="activeSection !== 0"
      :icon="iconTop"
      @click.prevent="$emit('nav-section', 0)"
      href="#"
    />
    <cv-link
      :disabled="activeSection === 1"
      :icon="missionIcon"
      @click.prevent="$emit('nav-section', 1)"
      href="#"
      ><span>Our mission</span></cv-link
    >
    <cv-link :icon="iconUpRight" href="/journey"
      ><span>Voter journey</span></cv-link
    >
    <cv-link
      :disabled="activeSection === 2"
      :icon="valuesIcon"
      @click.prevent="$emit('nav-section', 2)"
      href="#"
      ><span>Our values</span></cv-link
    >
    <cv-link :icon="iconUpRight" href="/voterSupport"
      ><span>Voter support</span></cv-link
    >
  </div>
</template>

<script setup>
import {
  ArrowDown32 as ArrowDown,
  ArrowUp32 as ArrowUp,
  ArrowUpRight32 as ArrowUpRight,
  CircleFilled32 as CircleFilled,
  UpToTop32 as UpToTop
} from "@carbon/icons-vue";
const iconDown = ArrowDown;
const iconUp = ArrowUp;
const iconUpRight = ArrowUpRight;
const iconSelected = CircleFilled;
const iconTop = UpToTop;

const props = defineProps({
  activeSection: { type: Number, default: 0 }
});
defineEmits(["nav-section"]);
const missionIcon = computed(() => {
  if (props.activeSection < 1) return iconDown;
  else if (props.activeSection > 1) return iconUp;
  else return iconSelected;
});
const valuesIcon = computed(() => {
  if (props.activeSection < 2) return iconDown;
  else if (props.activeSection > 2) return iconUp;
  else return iconSelected;
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";

.nav-container {
  position: fixed;
  transition-property: bottom, color;
  transition-duration: 1s;
  bottom: 320px;
  z-index: 100;
  left: 4rem;
  display: flex;
  gap: 3rem;
  color: white;
  @include carbon--breakpoint-down(md) {
    font-size: carbon--type-scale(1);
    margin-left: 2rem;
    gap: 0.5rem;
  }
  svg {
    position: absolute;
    top: 0;
    transform: translate(-8px, -100%);
  }
  a {
    color: white;
    text-decoration: none;
    span:nth-child(1) {
      position: relative;
      top: -4px;
      margin-right: 8px;
      font-size: carbon--type-scale(6);
      @include carbon--breakpoint-down(md) {
        margin-right: 0;
        font-size: carbon--type-scale(1);
      }
    }
  }
  &.active-section-1 {
    bottom: 120px;
    color: $ff-purple-02;
    a {
      color: $ff-purple-02;
    }
  }
  &.active-section-2 {
    bottom: 120px;
    color: $ff-blue-03;
    a {
      color: $ff-blue-03;
    }
  }
}
</style>
