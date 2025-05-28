<script setup>
defineProps({
  title: { type: String, required: true },
  imageSrc: { type: String, required: true },
  imageClass: { type: String, default: "", required: false },
  to: { type: String, required: true },
  checked: { type: Boolean, default: false },
});
</script>

<template>
  <cv-tile
    kind="clickable"
    class="card-zoom"
    :to="to"
  >
    <div class="card-zoom-image" :style="{backgroundImage: `url(${imageSrc})`}"/>
    <h1 class="card-zoom-text">{{ title }}</h1>
  </cv-tile>
</template>
<style lang="css">
.card-zoom {
  @apply relative flex items-center justify-center m-3 overflow-hidden mb-4 !p-0 w-48 h-36 md:w-96 md:h-72 ;
}
.card-zoom-image {
  @apply absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover;
}
.card-zoom-text {
  @apply absolute text-xs md:text-xl bg-white/80 contrast-more:bg-white contrast-more:p-2 text-carbon-gray-90 transition-all duration-500 ease-in-out transform right-0 bottom-0 md:right-auto md:bottom-auto md:scale-150 max-w-[60%];
}
.card-zoom:hover .card-zoom-image {
  @apply scale-150;
}
.card-zoom:hover .card-zoom-text {
  @apply scale-100 contrast-more:scale-150;
}
</style>
