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
                >Seniors, find a ride to the polls</cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://ymcaofcoastalga.org/news/2018/10/17/ymca-news/ymca-works-to-help-make-it-easier-for-parents-to-vote/"
                >Free election day childcare</cv-link
              >
              <br />
              <cv-link
                class="aside__link"
                href="https://www.npr.org/2020/08/07/900210406/the-most-important-mail-youll-ever-send-a-ballot"
                >Mail-in Voting Instructions</cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx"
                >Voting for Felons </cv-link
              ><br />
              <cv-link
                class="aside__link"
                href="https://sos.ga.gov/index.php/elections/voters_with_disabilities"
                >Voter Tips for The Disabled</cv-link
              ><br />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.orem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. orem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
    this.regData = this.$route.params.regData;
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>

//
