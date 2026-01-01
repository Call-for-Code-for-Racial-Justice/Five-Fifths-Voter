<script setup>
import { CheckCircle } from "lucide-vue-next";

defineProps({
  title: { type: String, required: true },
  imageSrc: { type: String, required: true },
  imageClass: { type: String, default: "", required: false },
  to: { type: String, required: true },
  checked: { type: Boolean, default: false },
});
</script>

<template>
  <NuxtLink :to="to" class="hover-3d mt-4">
    <!-- content -->
    <div class="card max-w-100 bg-base-300">
      <div class="card-body">
        <img :src="imageSrc" :alt="title" class="rounded-2xl">
        <p class="font-semibold flex items-center">
          <span v-if="checked" class="mr-2 text-ff-green-01"><CheckCircle class="size-4"/></span>
          {{ title }}
        </p>
      </div>
    </div>
    <!-- 8 empty divs needed for the 3D effect -->
    <div/>
    <div/>
    <div/>
    <div/>
    <div/>
    <div/>
    <div/>
    <div/>
  </NuxtLink>
</template>
