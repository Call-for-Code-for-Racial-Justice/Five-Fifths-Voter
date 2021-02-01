<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">Support when you need it</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside">
          <div class="aside__container--text">
            <h2 class="aside__header">Resources are available to help you</h2>
            <div class="aside__link aside__container--links">
              <cv-link
                class="aside__link"
                href="https://www.empowerline.org/services/transportation-options/"
                target="_blank"
                >Seniors, find a ride to the polls &rarr;</cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://ymcaofcoastalga.org/news/2018/10/17/ymca-news/ymca-works-to-help-make-it-easier-for-parents-to-vote/"
                target="_blank"
                >Free election day childcare &rarr;</cv-link
              >
              <br />
              <cv-link
                class="aside__link"
                href="https://www.npr.org/2020/08/07/900210406/the-most-important-mail-youll-ever-send-a-ballot"
                target="_blank"
                >Mail-in voting instructions &rarr;</cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx"
                target="_blank"
                >Voting for felons &rarr;</cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://sos.ga.gov/index.php/elections/voters_with_disabilities"
                target="_blank"
                >Voter tips for the disabled &rarr;</cv-link
              ><br />
            </div>
            <p>
              Each voter’s journey is different. Five Fifths Voter can put you on the right path to
              reclaiming voter confidence. Please visit our support channels to help guide you.
            </p>
          </div>
        </aside>
      </template>
      <template v-slot:image>
        <aside class="aside__container--img">
          <img
            class="aside__image"
            src="../../assets/support-page-father-baby-image-1.jpg"
            alt="Man lounges on beanbag chair while browsing on his laptop"
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
  created() {
    this.$amplitude.getInstance().logEvent('Page Visit', { page: 'Support Page' });
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>
