<template>
  <div class="nav-container">
    <img alt="" src="@/assets/images/nav-lines.svg" />
    <cv-link :icon="iconDown" href="#"><span>Our mission</span></cv-link>
    <cv-link :icon="iconUpRight" href="/journey"
      ><span>Voter journey</span></cv-link
    >
    <cv-link :icon="iconDown" href="#"><span>Our values</span></cv-link>
    <cv-link :icon="iconUpRight" href="/voterSupport"
      ><span>Voter support</span></cv-link
    >
  </div>
</template>

<script setup>
import {
  ArrowDown32 as ArrowDown,
  ArrowUpRight32 as ArrowUpRight
} from "@carbon/icons-vue";
const iconDown = ArrowDown;
const iconUpRight = ArrowUpRight;
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";

.nav-container {
  display: flex;
  gap: 3rem;
  position: relative;
  color: white;
  margin-left: 4rem;
  @include carbon--breakpoint-down(md) {
    font-size: carbon--type-scale(1);
    margin-left: 2rem;
    gap: 0.5rem;
  }
  img {
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
}
</style>
