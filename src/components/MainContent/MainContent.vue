<template>
  <div class="main-content bx--grid">
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-lg-6">
        <slot name="content" />
      </div>
      <div class="bx--col-sm-12 bx--col-lg-6">
        <slot name="image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  props: ['childData']
  //pagelayout needs prop for backgroundImg
};
</script>
