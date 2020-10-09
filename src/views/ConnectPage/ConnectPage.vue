<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">Vote social</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside">
          <div class="aside__container--text">
            <h2 class="aside__header">Resources are available to help you</h2>
            <div class="aside__container--links">
              <a
                href="https://www.facebook.com/gpa/best-practices/local-government"
                ><img
                  style="fill: #fff"
                  src="@/assets/logo--facebook.svg"
                  alt="Facebook Logo"/></a
              ><br />
              <!-- <a href="https://www.instagram.com/explore/tags/election/?hl=en"
                >Instagram #Election</a
              ><br />
              <a href="https://twitter.com/search?q=%23election&src=typed_query"
                >Twitter #Election</a
              ><br /> -->
              <br />
            </div>
            <TwitterChatter />
          </div>
        </aside>
      </template>
      <template v-slot:image>
        <aside class="aside__container--img">
          <img
            class="aside__image"
            src="../../assets/connect-page-friends-image-1.jpg"
            alt="3 friends with sunglasses smile into the camera while hugging"
          />
        </aside>
      </template>
    </MainContent>
  </PageLayout>
</template>

<script>
import TwitterChatter from '../../components/TwitterChatter';
import PageLayout from '../../components/PageLayout';
import MainContent from '../../components/MainContent';

export default {
  name: 'connect',
  components: { TwitterChatter, PageLayout, MainContent },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
