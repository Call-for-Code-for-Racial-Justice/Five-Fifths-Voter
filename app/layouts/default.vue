<template>
  <div>
    <the-header />
    <main id="#main-content" class="main-content with-header">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { locale } = useI18n();

defineOptions({
  name: "DefaultLayout",
});
useHead({
  htmlAttrs: {
    lang: locale || "en",
  },
});
import "@/assets/css/five-fifths-theme.css";
</script>

<style lang="scss">
@import "@/assets/scss/theme";
.with-header {
  margin-top: 6rem;
  margin-left: 1rem;
}
body {
  margin: unset;
  font-family: "IBM Plex Sans", sans-serif;
  overflow: auto;
}
</style>
