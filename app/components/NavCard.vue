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
  <div class="indicator">
    <span class="indicator-item badge badge-primary">{{ checked ? 'done' : 'no done' }}</span>
    <NuxtLink class="card" :to="to">
      <figure>
        <img
            :src="imageSrc"
            :alt="title">
      </figure>
      <div class="card-body">
        <h1 class="card-title">{{ title }}</h1>
      </div>
    </NuxtLink>
  </div>
</template>
