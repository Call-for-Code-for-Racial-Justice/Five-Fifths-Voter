<script setup>
defineProps({
  href: { type: String, required: true },
});
</script>
<template>
  <div>
    <cv-link
        class="ff-link mb-2"
        :href="href"
        target="_blank"
    >
      <span class="text-sm text-ff-white-01 md:text-base">
      <slot/>
      </span>
    </cv-link>
  </div>
</template>
