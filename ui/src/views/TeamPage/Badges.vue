<template>
  <div>
    <cv-inline-loading
      v-if="loading"
      ending-text="Sorting your badges"
      error-text="Could not load badges"
      loading-text="Loading badges"
      loaded-text="Loaded badges"
      :state="loadingState"
    ></cv-inline-loading>
    <div v-else>
      <div class="team__badges">
        You have earned
        {{ badges.length }} badges
      </div>
      <div class="team__badge" v-for="(badge, index) in badges" :key="badge._id">
        <show-badge :badge="badge" :forceShow="autoShow[index]" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ShowBadge from './ShowBadge.vue';

export default {
  name: 'VoterBadges',
  components: { ShowBadge },
  data: () => ({
    loadingState: 'loading',
    badges_x: [
      {
        _id: 'joined',
        name: 'Team up',
        image: '/images/badges/noun-collaboration-2909353.svg',
        description:
          'You earned a badge for joining a team! Make a plan to vote. Take someone from your team with you.',
        seen: false
      },
      {
        _id: 'created',
        name: 'Started Team',
        image: '/images/badges/noun-leadership-2909348.svg',
        description:
          'You earned a badge for creating a team! Get your team together and set your voting goals.',
        seen: false
      },
      {
        _id: 'login',
        name: 'Created account',
        image: '/images/badges/noun-politician-2909359.svg',
        description: 'You earned a badge for logging in! Make a plan to vote.',
        seen: false
      },
      {
        _id: 'madeList',
        name: 'Created candidate list',
        image: '/images/badges/noun-food-critic-2909382.svg',
        description:
          'You earned a badge for creating a list of candidates! Take your list to your polling location and vote!',
        seen: false
      }
    ]
  }),
  async created() {
    this.loadingState = 'loading';

    await this.$store.dispatch('loadBadges');

    this.loadingState = 'ending';
    this.loadingState = await new Promise(resolve => setTimeout(() => resolve('loaded'), 1000));
  },
  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current,
      badges: state => state.user.badges
    }),
    autoShow() {
      var showing = new Array(this.badges.length);
      showing.fill(false);
      var notSeen = this.badges.findIndex(doc => doc.seen === false);
      if (notSeen > -1) showing[notSeen] = true;
      // showing.fill(false); //debug
      // showing[0] = true; // debug
      return showing;
    },
    loading() {
      return ['loading', 'ending', 'error'].includes(this.loadingState);
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/inline-loading/inline-loading';
.team {
  margin-top: 4rem;
  &__badges {
    @include carbon--type-style('productive-heading-02');
    margin-bottom: 1rem;
    margin-left: 2rem;
  }
}
</style>
