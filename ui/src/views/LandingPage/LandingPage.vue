<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <Countdown />
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <div class="article__content">
            <h2 class="article__heading">{{ $t('landingPageMain') }}</h2>
            <div class="bx--offset-lg-1">
              <p class="article__paragraph">
                {{ $t('landingPageDesc', ['Five Fifths Voter', 'Five Fifths Voter']) }}
              </p>
            </div>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <div class="article__img-container">
          <img
            class="article__img"
            src="../../assets/landing-page-man-on-laptop-image-1.jpg"
            alt="Man lounges on beanbag chair while browsing on his laptop"
          />
        </div>
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <div class="article__content">
            <h2 class="article__heading">{{ $t('landingPageEdu') }}</h2>
            <span class="article__quote"
              >&quot;{{ $t('quoteFrancisBacon') }}&quot;<span class="quote--author"
                >- Francis Bacon</span
              ></span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p class="article__paragraph">
                {{ $t('landingPageEduDesc', ['Five Fifths Voter']) }}
              </p>
            </div>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <div class="article__img-container">
          <img
            class="article__img"
            src="../../assets/landing-page-grandpa-grandson-image-2.jpeg"
            alt="A smiling grandfather dotes on his baby grandson that he's holding"
          />
        </div>
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <div class="article__content">
            <h2 class="article__heading">{{ $t('landingPageEmpower') }}</h2>
            <span class="article__quote"
              >&quot;{{ $t('quoteCharlotteBronte') }}&quot;
              <span class="quote--author">- Charlotte Brontë</span></span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p class="article__paragraph">
                {{ $t('landingPageEmpowerDesc', ['Five Fifths Voter']) }}
              </p>
            </div>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <div class="article__img-container">
          <img
            class="article__img"
            src="../../assets/landing-page-black-woman-orange-image-3.jpeg"
            alt="Black woman wearing bright orange against brick wall smiles into distance"
          />
        </div>
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <div class="article__content">
            <h2 class="article__heading">{{ $t('landingPageEnable') }}</h2>
            <span class="article__quote"
              >&quot;{{ $t('quotePaulRepetto') }}&quot;
              <span class="quote--author">- Paul Repetto</span></span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p class="article__paragraph">
                {{ $t('landingPageEnableDesc', ['Five Fifths Voter']) }}
              </p>
            </div>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <div class="article__img-container">
          <img
            class="article__img"
            src="../../assets/landing-page-disabled-triathlete-image-4.jpeg"
            alt="A young teenaged paraplegic is racing in a wheelchair"
          />
        </div>
      </template>
    </MainContent>
  </PageLayout>
</template>

<script>
import Countdown from '../../components/Countdown';
import PageLayout from '../../components/PageLayout';
import MainContent from '../../components/MainContent';
import { mapState } from 'vuex';

export default {
  name: 'LandingPage',
  props: {
    heroImage: String,
  },
  components: { Countdown, PageLayout, MainContent },
  data() {
    return {
      yourName: '',
      firstName: '',
      lastName: '',
      dob: '',
      visible: false,
      midtermMode: false,
    };
  },
  computed: {
    ...mapState({
      redirected: (state) => state?.user?.redirected,
    }),
  },
  created() {
    if (this.midtermMode && !this.redirected) {
      this.$store.commit('setRedirected', true);
      this.$router.push({ name: 'journey-page' });
    }
  },
  methods: {
    onClick() {
      this.visible = true;
    },
    modalClosed() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
@import './landingpage.scss';
</style>
