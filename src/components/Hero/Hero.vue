<template>
  <div class="hero">
    <!-- <img
      class="hero__image"
      v-bind:src="require(`@/assets/${img}`)"
      alt="woman is holding daughter"
    /> -->
    <h1 class="hero__heading">five fifths voter.</h1>
    <h2 class="hero__description">
      We will educate Black voters by providing them with guidance and directing
      them to the most up-to-date tools necessary to complete the voting
      process.
    </h2>
    <h3 class="hero__quote">
      "My dear friends: Your vote is precious, almost sacred. It is the most
      powerful nonviolent tool we have to create a more perfect union."
      <br />
      <span class="hero__author"> - John Lewis, 2012</span>
    </h3>
    <cv-button class="button--cta">
      <span class="button--cta-text">Call to Action</span>
    </cv-button>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    img: String
  }
};
</script>
