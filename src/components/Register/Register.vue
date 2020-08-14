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
      <p class="article__description">
        It is through blood, sweat and tears that black people earned the right
        to vote.
        <br /><br />
        Many black people protested, marched, were arrested and even died as
        they fought the battle for voting equality. We implore you to not let
        these sacrifices be in vain but to cease the opportunity that your
        ancestors provided, that your voice can be heard in America.
        <br /><br />
        In 1868, the 14th Amendment gave black people the rights of citizenship
        but it would be over 97 years before they could successfully execute
        their right to vote. During this time span poll taxes, literacy tests,
        and other tactics were used to undermine black people’s right to vote.
        It was not until 1965 when Voting Rights Act was executed that provided
        a successful pathway for black people to vote.
        <br /><br />
        Please exercise your right to vote. It was hard earned by your
        ancestors.
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
