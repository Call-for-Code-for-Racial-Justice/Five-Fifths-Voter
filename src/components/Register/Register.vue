<template>
  <section class="main main--register">
    <aside class="content--register">
      <h1 class="heading--lg">vote like it's hot.</h1>
      <h4
        class="heading--sm"
      >voting is the future for your neighbors, your friends, your family, and yourself.</h4>
      <p>
        why is it important?
        <br />
        <br />three things you need to know.
        <br />
        <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </aside>
    <iframe
      v-resize="{ log: true }"
      src="https://register.vote.org/?partner=111111&campaign=free-tools"
      width="100%"
      marginheight="0"
      frameborder="0"
      id="frame1"
      scrollable="no"
    ></iframe>
  </section>
</template>

<script>

export default {
  name: 'reg',
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
};
</script>