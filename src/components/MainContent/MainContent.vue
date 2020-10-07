<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <slot name="content" />
      </div>
      <div class="bx--col">
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
