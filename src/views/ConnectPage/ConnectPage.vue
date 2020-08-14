<template>
  <cv-content id="#main-content">
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section class="main main--register">
            <aside class="content--register">
              <h1 class="heading--lg">vote social</h1>
              <h4
                class="heading--sm"
              >take a friend to vote</h4>
              <p>
                <cv-link href="https://www.facebook.com/gpa/best-practices/local-government">Facebook</cv-link><br />
                <cv-link href="https://www.instagram.com/explore/tags/election/?hl=en">Instagram #Election</cv-link><br />
                <cv-link href="https://twitter.com/search?q=%23election&src=typed_query">Twitter #Election</cv-link><br />
                <br />

              </p>
              <TwitterChatter />
            </aside>
          </section>
        </div>
      </div>
    </div>
  </cv-content>
</template>

<script>
import TwitterChatter from '../../components/TwitterChatter';

export default {
  name: 'connect',
  components: { TwitterChatter },
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
