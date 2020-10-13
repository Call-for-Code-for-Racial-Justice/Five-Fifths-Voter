<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">why vote?</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside">
          <div class="aside__container--text">
            <h2 class="aside__header">Why Vote?</h2>
            <p>
              <strong><em>Your vote = Your voice</em></strong>
              <br /><br />
              Voter Suppression in the United States has
              left many discouraged and wondering if there is a purpose to
              voting at all. Five-Fifths was created as a reminder that if our
              votes didn’t matter, voter suppression wouldn’t exist. In fact,
              voting is a key component in reclaiming power by determining your
              future reality as well as that of future generations. 
              <br /><br />
              <strong><em>Don’t like certain laws in your community? Voting can change that.</em></strong> 
              <br /><br />
              By taking the time to vote, you have the power to affect change in areas
              that directly matter to and impact you and your loved ones. 
              <!-- <br /><br />
              Such topics include: <strong>Your Money</strong>- how much you will pay in taxes and
              determining what those areas will be, <strong>Employment</strong> (i.e. raising
              minimum wage), <strong>Public Transportation</strong>, <strong>Housing</strong>, <strong>Education</strong>, and
              <strong>Healthcare</strong>. Voting gives you an option to decide who is elected in
              office that makes these decisions. It is our “civic duty”, yes,
              but most importantly, it is your soul opportunity to stand up for
              the issues YOU care about. By choosing not to vote, you place that
              decision in the hands of someone else.  -->
              <br /><br />
              <strong><em>You are the captain of your own ship. </em></strong>
              <br /><br />
              Voting is the perfect time to implement change. It is
              also a time to unite together regardless of race, background or
              creed and stand in solidarity to implement our God-given rights,
              otherwise remain siloed in a predefined shell. Some may never
              fully comprehend the importance of voting, while some may never
              have the privilege. Your future and that of your community depend
              on YOU. At Five-Fifths, we make sure that your vote will be yours
              and yours alone. 
              <br /><br />
              Join us to Get <strong><em>registered</em></strong>, <strong><em>Get educated</em></strong>, <strong><em>Get
              social</em></strong>, and <strong><em>Get vocal</em></strong>.
              <br /><br />
        
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
  created() {},
  methods: {}
};
</script>
