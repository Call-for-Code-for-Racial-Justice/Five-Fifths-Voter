<template>
  <div class="title--block">
    <img alt="Five Fifths voter" src="@/assets/images/five-fifths-voter.svg" />
  </div>
</template>

<script setup>
defineOptions({
  name: "TitleBlock",
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.title--block {
  position: absolute;
  top: 2rem;
  left: 2rem;
  height: 56px;
  width: 160px;
}
</style>
