<template>
  <div>
    <the-header />
    <main class="main-content with-header" id="#main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
defineOptions({
  name: "DefaultLayout",
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
