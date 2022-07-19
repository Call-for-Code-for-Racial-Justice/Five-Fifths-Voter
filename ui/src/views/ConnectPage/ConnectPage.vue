<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">{{ $t('connectedPageTitle') }}</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside" aria-label="get connected to voters">
          <div class="aside__container--text">
            <h2 class="aside__header">
              {{ $t('connectedPageMain') }}
            </h2>
            <div class="aside__container--links">
              <a
                href="https://www.facebook.com/gpa/best-practices/local-government"
                target="_blank"
                :title="$t('connectedPageFbLabel')"
              >
                <logo-facebook class="icon--social" focusable="false" aria-hidden="true" />
              </a>
              <br />
              <a
                href="https://www.instagram.com/explore/tags/election/?hl=en"
                target="_blank"
                :title="$t('connectedPageInstaLabel')"
              >
                <logo-instagram class="icon--social" focusable="false" aria-hidden="true" />
              </a>
              <br />
              <a
                href="https://twitter.com/search?q=%23election&src=typed_query"
                target="_blank"
                :title="$t('connectedPageTwitterLabel')"
              >
                <logo-twitter class="icon--social" focusable="false" aria-hidden="true" />
              </a>
              <br />
              <a
                href="https://m.youtube.com/results?search_query=election+debates"
                target="_blank"
                :title="$t('connectedPageYoutubeLabel')"
              >
                <logo-youtube class="icon--social" focusable="false" aria-hidden="true" />
              </a>
            </div>
            <TwitterChatter />
          </div>
        </aside>
      </template>
      <template v-slot:image>
        <aside class="aside__container--img" aria-label="get connected to voters image">
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
import { LogoFacebook32, LogoInstagram32, LogoTwitter16, LogoYoutube16 } from '@carbon/icons-vue';
export default {
  name: 'connect',
  components: {
    TwitterChatter,
    PageLayout,
    MainContent,
    LogoTwitter: LogoTwitter16,
    LogoYoutube: LogoYoutube16,
    LogoInstagram: LogoInstagram32,
    LogoFacebook: LogoFacebook32,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
