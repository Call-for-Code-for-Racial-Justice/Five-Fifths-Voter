<script setup>
const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale || "en",
  },
});
</script>

<template>
  <div>
    <TheHeader />
    <JourneySubNav/>
    <main id="#main-content" class="main-content with-header">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
.with-header {
  margin-top: 6rem;
  margin-left: 1rem;
}
body {
  margin: unset;
  overflow: auto;
}
</style>
