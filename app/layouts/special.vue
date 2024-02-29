<!-- this layout has no nav/header and so is intended for special pages like the home page -->
<template>
  <div>
    <main id="#main-content" class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
defineOptions({
  name: "SpecialLayout",
});
import "@/assets/css/five-fifths-theme.css";
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "IBM Plex Sans", sans-serif;
}
</style>
