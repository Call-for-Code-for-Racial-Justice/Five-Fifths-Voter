<template>
  <div class="silhouette-group">
    <img src="@/assets/images/mask-group.svg" >
  </div>
</template>
<script setup>
defineOptions({
  name: "SilhouetteGroup",
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.silhouette-group {
  width: 100%;
  height: 1000px;
  overflow: hidden;
  background-color: $ff-green-02;
  img {
    width: 100%;
  }
}
</style>
