<template>
  <div>
    <div class="upper-container">
      <hero>
        <five-fiths-title class="title" />
        <div class="upper-flow">
          <div class="whole">
            A whole person.<br />A whole community.<br />A whole nation.
          </div>
          <div class="motto">
            Together, we can change the narrative of historically
            disenfranchised people in our democratic process.
          </div>
          <main-nav />
        </div>
      </hero>
    </div>
    <div class="footer"><countdown /></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "special"
});
</script>

<style lang="scss">
@import "@/assets/scss/theme";
.upper-container {
  height: calc(100vh - 320px);
}
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
.upper-flow {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 320px - 92px);
  .whole {
    @include type-style("productive-heading-01");
    font-size: carbon--type-scale(13);
    width: 35%;
    max-width: 480px;
    color: white;
    margin-left: 4rem;
    @include carbon--breakpoint-down(lg) {
      width: calc(100% - 5rem);
      padding-right: 1rem;
    }
    @include carbon--breakpoint-down(md) {
      font-size: carbon--type-scale(5);
      margin-left: 2rem;
    }
  }
  .motto {
    @include type-style("body-long-02");
    font-size: carbon--type-scale(7);
    width: 35%;
    max-width: 480px;
    color: white;
    margin-left: 4rem;
    @include carbon--breakpoint-down(md) {
      font-size: carbon--type-scale(4);
      width: calc(100% - 5rem);
      padding-right: 1rem;
      margin-left: 2rem;
    }
  }
}
</style>
