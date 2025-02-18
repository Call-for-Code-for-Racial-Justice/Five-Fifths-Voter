<template>
  <div :class="`nav-container active-section-${activeSection}`">
    <svg-nav-lines />
    <cv-link
      v-if="activeSection !== 0"
      :icon="iconTop"
      href="#"
      @click.prevent="$emit('nav-section', 0)"
    />
    <cv-link
      :disabled="activeSection === 1"
      :icon="missionIcon"
      href="#"
      @click.prevent="$emit('nav-section', 1)"
    >
      <span>Our mission</span>
    </cv-link>
    <cv-link
      :icon="iconUpRight"
      href="/journey"
    >
      <span>Voter journey</span>
    </cv-link>
    <cv-link
      :disabled="activeSection === 2"
      :icon="valuesIcon"
      href="#"
      @click.prevent="$emit('nav-section', 2)"
    >
      <span>Our values</span>
    </cv-link>
    <cv-link
      :icon="iconUpRight"
      href="/voterSupport"
    >
      <span>Voter support</span>
    </cv-link>
  </div>
</template>

<script setup>
import {
  ArrowDown32 as ArrowDown,
  ArrowUp32 as ArrowUp,
  ArrowUpRight32 as ArrowUpRight,
  CircleFilled32 as CircleFilled,
  UpToTop32 as UpToTop,
} from "@carbon/icons-vue";
const iconDown = ArrowDown;
const iconUp = ArrowUp;
const iconUpRight = ArrowUpRight;
const iconSelected = CircleFilled;
const iconTop = UpToTop;

const props = defineProps({
  activeSection: { type: Number, default: 0 },
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

const countdownData = inject(
  "countdown-data",
  ref({ height: 320, visible: true }),
);
const bottom = computed(() => {
  return `${countdownData.value.height || 320}px`;
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";

.nav-container {
  position: fixed;
  transition-property: bottom, color;
  transition-duration: 1s;
  bottom: v-bind(bottom);
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
    bottom: 25px;
    color: $ff-purple-02;
    a {
      color: $ff-purple-02;
    }
  }
  &.active-section-2 {
    bottom: 25px;
    color: $ff-blue-03;
    a {
      color: $ff-blue-03;
    }
  }
}
</style>
