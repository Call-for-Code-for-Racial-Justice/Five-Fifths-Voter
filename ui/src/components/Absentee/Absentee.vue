<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaAbsenteeInfo')">
        <div class="aside__container--text">
          <h2 class="aside__header">{{ $t('absenteeTitle') }}</h2>
          <p class="aside__paragraph">
            {{ $t('absenteeDesc') }}
          </p>
          <cv-link href="https://www.vote.org/absentee-ballot/" target="_blank">
            {{ $t('absenteeRequest') }} &rarr;
          </cv-link>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
        <img
          class="aside__img"
          src="../../assets/absentee-page-group-friends-laptop-image-1.jpg"
          :alt="$t('absenteeImageAlt')"
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';

export default {
  name: 'absentee',
  components: { MainContent },
  data() {
    return {};
  },
  created() {
    this.$amplitude
      .getInstance()
      .logEvent('Page Visit', { page: 'Journey Page', component: 'Absentee' });
  }
};
</script>
<style lang="scss">
.aside__img {
  max-width: 100%;
}
</style>
