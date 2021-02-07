<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">Why vote?</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside">
          <div class="aside__container--text">
            <h2 class="aside__header">So what's the deal?</h2>
            <p class="aside__paragraph">
              In 1868, the 14th Amendment gave Black people citizenship in America, but it would be
              over 97 years before they could successfully vote. During this time span poll taxes,
              literacy tests, and other tactics were used to undermine Black people's right to vote.
              <br /><br />
              In 1965, the Voting Rights Act provided a successful pathway for Black and many
              disenfranchised people to vote. Many Black people protested, marched, were arrested
              and even died as they fought the battle for voting equality.
              <br /><br />
              Voting is the perfect way to implement change. As American citizens, regardless of
              race, sex, background or nationality, we can stand in solidarity as a whole and
              exercise the right to be heard. Five Fifths Voter is tailored to help Black and other
              disenfranchised voters to seize the opportunity to be heard in America.
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
