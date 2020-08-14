<template>
  <section class="main main--register">
    <aside class="content--register">
      <h1 class="heading--lg">
        can't be there? you don't have to be a square.
      </h1>
      <h4 class="heading--sm">
        absentee voting is as easy as signing up before your state's deadline.
      </h4>
      <p>
      <img
        class="article__img"
        src="../../assets/vote-absentee-1.jpg"
        alt="stock image of voters at a voting poll"
      />
      <p class="article__description">
        why is it important?
        <br />
        <br />three things you need to know.
        <br />
        <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.orem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. orem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <img
        class="article__img"
        src="../../assets/vote-absentee-2.jpg"
        alt="stock image of voters at a voting poll"
      />
    </aside>
    <iframe
      v-resize="{ log: true }"
      src="https://absentee.vote.org/?partner=111111&campaign=free-tools"
      width="100%"
      marginheight="0"
      frameborder="0"
      id="frame2"
      scrollable="no"
    ></iframe>
  </section>
</template>

<script>
export default {
  name: 'absentee',
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
