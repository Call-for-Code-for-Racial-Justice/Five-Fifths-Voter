<template>
  <div>
    <AppHeader />
    <cv-grid fullWidth class="activities">
      <cv-row>
        <cv-column>
          <div class="activities__user">Welcome {{ given_name }}</div>
        </cv-column>
        <cv-column>
          <CreateTeam />
        </cv-column>
      </cv-row>
      <cv-row>
        <cv-column :lg="10" v-if="loading">
          <cv-inline-loading
            ending-text="Here comes the awesome"
            error-text="Could not load your teams"
            loading-text="Loading your teams"
            loaded-text="Loaded your teams"
            :state="loadingState"
          ></cv-inline-loading>
        </cv-column>
        <cv-column :lg="10" v-else>
          <div class="activities__yours">Your Election Teams</div>
          <cv-list :ordered="false">
            <cv-list-item v-for="team in yours" :key="team._id">
              <cv-link :to="{ name: 'team', params: { teamId: team.team } }" :inline="true">
                {{ team.team }}
              </cv-link>
            </cv-list-item>
            <div v-if="yours.length === 0">
              You have not joined any teams yet. Look at your invitations or maybe create your own
              team.
            </div>
          </cv-list>
          <div class="activities__invitations">Your Invitations</div>
          <cv-list :ordered="false">
            <cv-list-item v-for="team in invitations" :key="team._id">
              <div>{{ team.team }}</div>

              <cv-button-set :stacked="false">
                <cv-button kind="primary" @click="actionAcceptInvitation(team.team)"
                  >Accept Invitation</cv-button
                >
                <cv-button kind="secondary" @click="actionAcceptInvitation(team.team, 'ignored')"
                  >Ignore Invitation</cv-button
                >
              </cv-button-set>
            </cv-list-item>
          </cv-list>
          <div v-if="invitations.length === 0">
            You do not have any invitations yet. Make sure your team leader has your correct email
            or maybe create your own team.
          </div>
        </cv-column>
      </cv-row>
      <cv-row>
        <cv-column :lg="10"> </cv-column>
      </cv-row>
    </cv-grid>
  </div>
</template>

<script>
import AppHeader from '../../components/AppHeader';
import CreateTeam from './CreateTeam.vue';
import { mapState } from 'vuex';

export default {
  name: 'ActivitiesPage',
  components: {
    AppHeader,
    CreateTeam
  },
  data: () => ({
    loadingState: 'loaded'
  }),
  async created() {
    this.loadingState = 'loading';
    await this.$store.dispatch('loadAccess');

    this.loadingState = 'ending';
    setTimeout(() => {
      this.loadingState = 'loaded';
    }, 1000);
  },

  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      access: state => state.teams.access
    }),

    loading() {
      return (
        this.loadingState === 'loading' ||
        this.loadingState === 'ending' ||
        this.loadingState === 'error'
      );
    },
    yours() {
      return this.access.filter(doc => doc.status === 'accepted' || doc.owner);
    },
    invitations() {
      return this.access.filter(doc => doc.status === 'invited');
    }
  },
  methods: {
    async actionAcceptInvitation(id, status = 'accepted') {
      let done = await this.$store.dispatch('updateInvite', { id: id, status: status });

      if (done && status === 'accepted')
        await this.$router.push({ name: 'team', params: { teamId: id } });
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/list/list';
@import 'carbon-components/scss/components/link/link';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/inline-loading/inline-loading';

.activities {
  margin-top: 4rem;
  &__user {
    @include carbon--type-style('productive-heading-03');
    margin-top: 1rem;
  }
  &__yours {
    @include carbon--type-style('productive-heading-02');
  }
  &__invitations {
    @include carbon--type-style('productive-heading-02');
    margin-top: 1rem;
  }
}
</style>
