<!-- this layout has no nav/header and so is intended for special pages like the home page -->
<template>
  <div>
    <main id="#main-content" class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import "@/assets/css/five-fifths-theme.css";
const { locale } = useI18n();

defineOptions({
  name: "SpecialLayout",
});
useHead({
  htmlAttrs: {
    lang: locale || "en",
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "IBM Plex Sans", sans-serif;
}
</style>
