<template>
  <cv-header aria-label="Carbon tutorial">
    <cv-skip-to-content href="#main-content"
      >Skip to content</cv-skip-to-content
    >
    <cv-header-name to="/">embRACEtheVOTE</cv-header-name>
    <cv-header-menu-item :to="{ name: 'why-page' }"
      >Why Vote</cv-header-menu-item
    >
    <cv-header-menu-item :to="{ name: 'journey-page' }"
      >Voter Journey</cv-header-menu-item
    >
    <cv-header-menu-item :to="{ name: 'connect-page' }"
      >Get Connected</cv-header-menu-item
    >
    <cv-header-menu-item :to="{ name: 'support-page' }"
      >Voter Support</cv-header-menu-item
    >
    <cv-header-menu-item :to="{ name: 'rate-page' }"
      >Rate The Vote</cv-header-menu-item
    >
  </cv-header>
</template>

<script>
export default {
  name: 'AppHeader'
};
</script>
