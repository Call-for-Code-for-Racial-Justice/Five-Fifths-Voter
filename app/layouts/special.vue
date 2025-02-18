<!-- this layout has no nav/header and so is intended for special pages like the home page -->
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

<template>
  <div>
    <main
      id="#main-content"
      class="main-content"
    >
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  font-family: "IBM Plex Sans", sans-serif;
}
</style>
