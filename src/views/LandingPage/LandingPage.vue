<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <Countdown />
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <h2 class="article__heading">Why vote</h2>
          <div class="bx--offset-lg-1">
            <p>
              It is through blood, sweat and tears that Black people earned the
              right to vote. Many Black people protested, marched, were arrested
              and even died as they fought the battle for voting equality. We
              implore you to not let these sacrifices be in vain but to cease
              the opportunity that your ancestors provided, that your voice can
              be heard in America.
              <br /><br />
              In 1868, the 14th Amendment gave Black people the rights of
              citizenship but it would be over 97 years before they could
              successfully execute their right to vote. During this time span
              poll taxes, literacy tests, and other tactics were used to
              undermine Black people’s right to vote.
              <br /><br />

              It was not until 1965 when Voting Rights Act was executed that
              provided a successful pathway for Black people to vote. Please
              exercise your right to vote. It was hard earned by your ancestors
            </p>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <img src="../../assets/man-glasses.jpg" alt="Black woman laughing" />
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <h2 class="article__heading">educate</h2>
          <span class="article__quote"
            >&quot;Knowledge is power.&quot; - Thomas Jefferson</span
          ><br /><br />
          <div class="bx--offset-lg-1">
            <p>
              We will educate Black voters by providing them with guidance and
              directing them to the most up-to-date tools necessary to complete
              the voting process.
            </p>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <img src="../../assets/man-glasses.jpg" alt="Black woman laughing" />
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <h2 class="article__heading">empower.</h2>
          <span class="article__quote"
            >&quot;I am no bird; and no net ensnares me: I am a free human being
            with an independent will. &quot;
            <span class="quote--author">- Charlotte Brontë</span></span
          ><br /><br />
          <div class="bx--offset-lg-1">
            <p>
              We will empower by generating solidarity amongst Black voting
              communities to encourage one another to vote, leveraging social
              media platforms for easy access to candidate information, and
              providing awareness about how their vote can impact his/her
              quality of life
            </p>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <img src="../../assets/man-glasses.jpg" alt="Black woman laughing" />
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <h2>enable.</h2>
          <span class="article__quote"
            >&quot;Enablement is the key to closing the gap between intention
            and action. &quot;
            <span class="quote--author">- Paul Repetto</span></span
          ><br /><br />
          <p>
            We will enable users to get to polling stations in the safest,
            cheapest, most efficient way by striving to eliminate the roadblocks
            on each Black voter’s journey
          </p>
        </article>
      </template>
      <template v-slot:image>
        <img src="../../assets/man-glasses.jpg" alt="Black woman laughing" />
      </template>
    </MainContent>
  </PageLayout>
</template>

<script>
// import Hero from '../../components/Hero';
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
@import '../../styles/carbon-overrides';
@import '../../styles/carbon-utils';
</style>
