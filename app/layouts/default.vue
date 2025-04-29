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
</script>

<template>
  <div>
    <TheHeader />
    <main
      id="#main-content"
      class="main-content px-1"
    >
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
