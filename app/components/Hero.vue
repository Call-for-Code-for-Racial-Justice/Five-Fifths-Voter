<script setup>
import actual from "actual";
defineOptions({
  name: "HeroBlock",
});

const props = defineProps({
  heightReserve: { type: Number, default: 320 },
});

// Resize for the screen
const parent = ref(null);
const el = ref(null);
const height = ref(`calc(100vh - ${props.heightReserve}px`);
const width = ref(`${1568}px`);

function resize() {
  if (parent.value) {
    const vw = actual("width", "px");
    const vh = actual("height", "px");

    width.value = `${vw}px`;
    height.value = `${vh - props.heightReserve}px`;
  }
}
onMounted(() => {
  parent.value = el.value.parentElement;
  window.addEventListener("resize", resize);
  resize();
});
onUnmounted(() => window.removeEventListener("resize", resize));
</script>

<template>
  <div
    ref="el"
    class="hero"
  >
    <slot>Add your content here</slot>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.hero {
  width: v-bind(width);
  height: v-bind(height);
  background-color: $ff-green-02;
  background-image: url("@/assets/images/mask-group.svg");
  background-size: cover;
  background-repeat: repeat-x;
  @include carbon--breakpoint(max) {
    background-size: contain;
    background-color: $ff-purple-01;
  }
}
</style>
