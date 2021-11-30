<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">{{ $t('whyVotePageTitle') }}</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside" :aria-label="$t('ariaWhy')">
          <div class="aside__container--text">
            <h2 class="aside__header">{{ $t('whyVotePageSubTitle') }}</h2>
            <p class="aside__paragraph">
              {{ $t('whyVotePageParagraph_1') }}
              <br /><br />
              {{ $t('whyVotePageParagraph_2') }}
              <br /><br />
              {{ $t('whyVotePageParagraph_3', ['Five Fifths Voter']) }}
              <br /><br />
              <MarkDown :content="$t('whyVotePageQuote')" />
            </p>
          </div>
        </aside>
      </template>
      <template v-slot:image>
        <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
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
import MarkDown from '@/components/MarkDown';

export default {
  name: 'connect',
  components: { PageLayout, MainContent, MarkDown },
  data() {
    return {};
  },
  created() {
    this.$amplitude.getInstance().logEvent('Page Visit', { page: 'Why Vote Page' });
  },
  methods: {},
};
</script>
