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
                {{ $t('landingPageDesc') }}
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
              >&quot;Knowledge is power.&quot;<span class="quote--author"
                >- Francis Bacon</span
              ></span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p class="article__paragraph">
                {{ $t('landingPageEduDesc') }}
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
              >&quot;I am no bird; and no net ensnares me: I am a free human being with an
              independent will. &quot; <span class="quote--author">- Charlotte Brontë</span></span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p class="article__paragraph">
                {{ $t('landingPageEmpowerDesc') }}
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
              >&quot;Enablement is the key to closing the gap between intention and action. &quot;
              <span class="quote--author">- Paul Repetto</span></span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p class="article__paragraph">
                {{ $t('landingPageEnableDesc') }}
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

export default {
  name: 'LandingPage',
  props: {
    heroImage: String
  },
  components: { Countdown, PageLayout, MainContent },
  data() {
    return {
      yourName: '',
      firstName: '',
      lastName: '',
      dob: '',
      visible: false
    };
  },
  created() {
    this.$amplitude.getInstance().logEvent('Page Visit', { page: 'Landing Page' });
  },
  methods: {
    onClick() {
      this.visible = true;
    },
    modalClosed() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss">
@import './landingpage.scss';
</style>
