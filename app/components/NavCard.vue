<script setup>
import {
  ArrowRight20 as ArrowRight,
  CheckmarkFilled20 as CheckmarkFilled,
} from "@carbon/icons-vue";

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
    class="mb-4 !p-0"
    :to="to"
  >
    <div class="relative aspect-[4/3] hover:scale-105">
      <img
        :class="`relative h-full w-full !max-w-full object-cover ${imageClass}`"
        :src="imageSrc"
        alt=""
      >
      <h4
        class="absolute bottom-0 right-0 min-h-[33%] w-1/2 bg-ff-pink-01 p-2 text-xs
          text-carbon-gray-90 md:h-1/3 md:p-2 md:text-xl"
      >
        {{ title }}
      </h4>
      <ArrowRight
        class="absolute bottom-3 right-3 text-carbon-gray-90 opacity-0 md:opacity-100"
      />
      <CheckmarkFilled
        v-if="checked"
        class="absolute right-3 top-3 text-ff-pink-01"
      />
    </div>
  </cv-tile>
</template>
