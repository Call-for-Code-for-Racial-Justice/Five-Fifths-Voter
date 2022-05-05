<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">{{ $t('supportTitle') }}</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside" :aria-label="$t('supportResources')">
          <div class="aside__container--text">
            <h2 class="aside__header">{{ $t('supportResources') }}</h2>
            <p>
              {{ $t('supportDesc', ['Five Fifths Voter']) }}
            </p>
            <br />
            <div class="aside__link aside__container--links">
              <cv-link
                class="aside__link"
                href="https://www.empowerline.org/services/transportation-options/"
                target="_blank"
              >
                {{ $t('supportSeniors') }} &rarr;</cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://www.ymca.org/find-your-y?distance=175&lat=26.0517448&lng=-80.13727569999999&geolocation_geocoder_address=33004&type=branch"
                target="_blank"
              >
                {{ $t('supportChildCare') }} &rarr;</cv-link
              >
              <br />
              <cv-link
                class="aside__link"
                href="https://www.npr.org/2020/08/07/900210406/the-most-important-mail-youll-ever-send-a-ballot"
                target="_blank"
              >
                {{ $t('supportMailVoting') }} &rarr;</cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx"
                target="_blank"
                >{{ $t('supportFelons') }} &rarr;</cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://sos.ga.gov/index.php/elections/voters_with_disabilities"
                target="_blank"
              >
                {{ $t('supportDisabled') }} &rarr;</cv-link
              >
            </div>
            <p>
              {{ $t('supportDesc', ['Five Fifths Voter']) }}
            </p>
            <br />
            <h4>
              {{ $t('voterJourneyLAResources') }}
            </h4>
            <br />
            <div class="aside__link aside__container--links">
              <cv-link
                class="aside__link"
                href="https://www.lavote.net/home/voting-elections/current-elections/upcoming-elections#"
                target="_blank"
              >
                {{ $t('supportLA_1') }} &rarr;</cv-link
              >
              <br />
              <cv-link
                class="aside__link"
                href="https://clerk.lacity.org/clerk-services/elections"
                target="_blank"
              >
                {{ $t('supportLA_2') }} &rarr;</cv-link
              >
            </div>
          </div>
        </aside>
      </template>
      <template v-slot:image>
        <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
          <img
            class="aside__image"
            src="../../assets/support-page-father-baby-image-1.jpg"
            :alt="$t('supportImgAlt')"
          />
        </aside>
      </template>
    </MainContent>
  </PageLayout>
</template>

<script>
import router from '../../router';
import PageLayout from '../../components/PageLayout';
import MainContent from '../../components/MainContent';

export default {
  name: 'reg',
  components: { PageLayout, MainContent },
  data() {
    return {
      regData: {}
    };
  },
  created() {},
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>
