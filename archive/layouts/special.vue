<!-- this layout has no nav/header and so is intended for special pages like the home page -->
<script setup>
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
}
</style>
