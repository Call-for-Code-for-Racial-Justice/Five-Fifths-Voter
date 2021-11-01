<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaRegister')">
        <div class="aside__container--text">
          <h2 class="aside__header">{{ $t('registerTitle') }}</h2>
          <p class="aside__paragraph">
            {{ $t('registerDesc') }}
          </p>
          <cv-link href="https://www.vote.org/am-i-registered-to-vote/" target="_blank">
            {{ $t('registerCheckVotingStatus') }} &rarr;</cv-link
          ><br /><br />
          <cv-link href="https://www.vote.org/register-to-vote/" target="_blank">
            {{ $t('registerRegisterToVote') }} &rarr;</cv-link
          ><br />
          <br /><br />
          {{ $t('registerYouth.1') }}
          <br /><br />
          <i18n path="registerYouth.2">
            <template v-slot:here>
              <a href="https://registertovote.ca.gov/" target="_blank">
                {{ $t('registerYouth.2a') }}</a
              >
            </template>
            <template v-slot:ymca>
              <a href="https://www.ymcayag.org/vote/" target="_blank">{{
                $t('registerYouth.2b')
              }}</a>
            </template>
          </i18n>
          <br /><br />
          <i18n path="registerYouth.3">
            <template v-slot:state>
              <a
                href="https://www.ncsl.org/research/elections-and-campaigns/preregistration-for-young-voters.aspx"
                target="_blank"
                >{{ $t('registerYouth.3a') }}</a
              >
            </template>
          </i18n>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
        <img
          class="aside__image"
          src="../../assets/register-page-woman-in-sun-image-1.jpeg"
          alt="Black woman with large afro smiles and looks off camera with the sun on her."
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';

export default {
  name: 'reg',
  components: { MainContent },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
@import './register.scss';
</style>
