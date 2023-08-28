<template>
  <cv-grid :full-width="true">
    <cv-row>
      <cv-column>
        <div class="silhouette-group">
          <img src="@/assets/images/mask-group.svg" />
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup></script>

<style lang="scss">
@import "@/assets/scss/theme";
.silhouette-group {
  width: 100%;
  height: 100%;
  background-color: $ff-green-02;
  img {
    width: 100%;
  }
}
</style>
