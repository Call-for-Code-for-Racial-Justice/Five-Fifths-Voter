<template>
  <div>
    <div style="height: calc(100vh - 320px)">
      <hero>
        <five-fiths-title class="title" />
        <div class="whole">
          A whole person.<br />A whole community.<br />A whole nation.
        </div>
        <div class="motto">
          Together, we can change the narrative of historically disenfranchised
          people in our democratic process.
        </div>
        <!--        <silhouette-group class="background" />-->
      </hero>
    </div>
    <div class="footer"><countdown /></div>
  </div>
</template>

<script setup>
import Hero from "~/components/Hero.vue";
</script>

<style lang="scss">
@import "@/assets/scss/theme";

.title {
  padding-top: 2rem;
  padding-left: 2rem;
}
.footer {
  height: 320px;
  position: relative;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -99;
}
.whole {
  @include type-style("productive-heading-03");
  width: 25%;
  max-width: 480px;
  color: white;
  margin-top: 4rem;
  margin-left: 4rem;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 64px; /* 114.286% */
  @include carbon--breakpoint-down(lg) {
    width: calc(100% - 5rem);
    padding-right: 1rem;
    margin-top: 2rem;
    font-size: 1.5rem;
    line-height: calc(1.5rem * 1.14);
  }
  @include carbon--breakpoint-down(md) {
    font-size: 1rem;
    line-height: calc(1rem * 1.14);
  }
}
.motto {
  @include type-style("quotation-02");
  width: 380px;
  color: white;
  margin-top: 4rem;
  margin-left: 4rem;
  @include carbon--breakpoint-down(md) {
    @include type-style("body-long-01");
    width: calc(100% - 5rem);
    padding-right: 1rem;
    margin-top: 2rem;
  }
}
</style>
