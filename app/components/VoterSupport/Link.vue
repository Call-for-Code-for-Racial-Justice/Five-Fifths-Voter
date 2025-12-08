<script setup>
defineProps({
  href: { type: String, required: true },
});
</script>
<template>
  <div>
    <a
      class="link link-hover ff-link mb-2"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="text-sm text-ff-white-01 md:text-base">
        <slot/>
      </span>
    </a>
  </div>
</template>
