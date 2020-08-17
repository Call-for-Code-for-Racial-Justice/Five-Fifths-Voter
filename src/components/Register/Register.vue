<template>
  <section class="main main--register">
    <aside class="content--register">
      <h1 class="heading--lg">vote like it's hot.</h1>
      <h4 class="heading--sm">
        voting is the future for your neighbors, your friends, your family, and
        yourself.
      </h4>
      <br />
      <img
        class="article__img article__img--register"
        src="../../assets/vote-register.jpg"
        alt="5 women of color at polling booths next to each other"
      />
      <br />
      <p class="article__paragraph">
Vestibulum tincidunt pulvinar augue sit amet rhoncus. Suspendisse in turpis vulputate, auctor libero et, fringilla magna. Duis semper lacus nibh, in pellentesque felis mollis non. Vestibulum sodales dui eros, vel blandit tortor consequat non. Etiam hendrerit tempus tristique. Cras tincidunt bibendum odio. Etiam elit nibh, mattis sed maximus in, semper nec nisi. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida posuere ante, et faucibus lectus molestie et. Aenean feugiat eu nunc vel vehicula. Maecenas at imperdiet erat. In id ullamcorper mi. Maecenas sollicitudin aliquam nisi, ut gravida tellus faucibus nec.
<br />
<br />
Integer bibendum augue eget sollicitudin malesuada. Etiam a quam ac nulla consectetur consectetur quis non felis. Etiam sed auctor dui. Etiam accumsan lectus sed nibh dignissim placerat. In sed ultrices neque. Suspendisse ac accumsan lorem. Sed at tempus justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ullamcorper semper scelerisque. Suspendisse quis molestie neque.
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
    return {};
  },
  created() {},
  methods: {}
};
</script>
