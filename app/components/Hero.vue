<template>
  <div class="hero" ref="el">
    <slot>Add your content here</slot>
  </div>
</template>

<script setup>
import { default as actual } from "actual";

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
    console.log(`hero ${vw} x ${parent.value?.clientHeight}`);

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

<style scoped lang="scss">
@import "@/assets/scss/theme";
.hero {
  width: v-bind(width);
  height: v-bind(height);
  background: $ff-green-02;
}
</style>
