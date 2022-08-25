<template>
  <cv-grid class="main-content">
    <cv-row>
      <cv-column :sm="12" :lg="6">
        <slot name="content" />
      </cv-column>
      <cv-column :sm="12" :lg="6">
        <slot name="image" />
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script>
export default {
  name: 'MainContent',
};
</script>
