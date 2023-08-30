<template>
  <cv-grid :full-width="true">
    <cv-row kind="condensed">
      <cv-column>
        <five-fiths-title class="title" />
        <div class="whole">
          A whole person.<br />A whole community.<br />A whole nation.
        </div>
        <div class="motto">
          Together, we can change the narrative of historically disenfranchised
          people in our democratic process.
        </div>
        <silhouette-group class="background" />
      </cv-column>
    </cv-row>
    <cv-row kind="condensed">
      <cv-column> <countdown class="footer" /> </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup></script>

<style lang="scss">
@import "@/assets/scss/theme";
.title {
  margin-top: 2rem;
  margin-left: 2rem;
}
.footer {
  position: absolute;
  bottom: 0;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -99;
}
.whole {
  @include type-style("productive-heading-03");
  width: 380px;
  color: white;
  margin-top: 4rem;
  margin-left: 4rem;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 64px; /* 114.286% */
}
.motto {
  @include type-style("body-short-01");
  width: 380px;
  color: white;
  margin-top: 4rem;
  margin-left: 4rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 133.333% */
}
</style>
