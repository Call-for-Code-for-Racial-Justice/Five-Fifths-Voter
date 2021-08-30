<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">{{ $t('whyVotePageTitle') }}</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside">
          <div class="aside__container--text">
            <h2 class="aside__header">{{ $t('whyVotePageSubTitle') }}</h2>
            <p class="aside__paragraph">
              {{ $t('whyVotePageParagraph.1') }}
              <br /><br />
              {{ $t('whyVotePageParagraph.2') }}
              <br /><br />
              {{ $t('whyVotePageParagraph.3', ['Five Fifths Voter']) }}
              <br /><br />
              Join us to <strong><em>get registered</em></strong
              >, <strong><em>get educated</em></strong
              >, <strong><em>get social</em></strong
              >, and <strong><em>get vocal</em></strong
              >.
            </p>
          </div>
        </aside>
      </template>
      <template v-slot:image>
        <aside class="aside__container--img">
          <img
            class="aside__image"
            src="../../assets/why-vote-page-father-daughter-image-1.jpg"
            alt="A young father holds his infant daughter on his shoulders"
          />
        </aside>
      </template>
    </MainContent>
  </PageLayout>
</template>

<script>
import PageLayout from '../../components/PageLayout';
import MainContent from '../../components/MainContent';

export default {
  name: 'connect',
  components: { PageLayout, MainContent },
  data() {
    return {};
  },
  created() {
    this.$amplitude.getInstance().logEvent('Page Visit', { page: 'Why Vote Page' });
  },
  methods: {}
};
</script>
