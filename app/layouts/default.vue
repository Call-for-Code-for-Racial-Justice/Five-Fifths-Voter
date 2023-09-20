<template>
  <div>
    <the-header />
    <main class="main-content with-header" id="#main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import "@/assets/css/five-fifths-theme.css";
</script>

<style lang="scss">
@import "@/assets/scss/theme";
.with-header {
  margin-top: 6rem;
  margin-left: 1rem;
}
</style>
