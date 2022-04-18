<template>
  <div>
    <AppHeader />
    <cv-grid fullWidth class="team">
      <cv-row v-if="!loadedData">
        <cv-column>
          <cv-loading
            :active="loadingData"
            :overlay="false"
            @loading-end="loadedData = true"
          ></cv-loading>
          <cv-skeleton-text :heading="true" :paragraph="true" :line-count="3"></cv-skeleton-text>
        </cv-column>
      </cv-row>

      <cv-row v-if="loadedData">
        <cv-column>
          <div class="activities__user">Welcome {{ given_name }}</div>
          <div class="team__title">
            {{ currentTeam.display_name }}
          </div>
          <div class="team__description">
            {{ currentTeam.description }}
          </div>
        </cv-column>
      </cv-row>
      <cv-row v-if="loadedData">
        <cv-column>
          <cv-tabs
            :container="true"
            aria-label="navigation tab label"
            @tab-selected="currentTab = $event"
          >
            <cv-tab label="Badges">
              <Badges v-if="currentTab == 0" />
            </cv-tab>
            <cv-tab label="Team Status">
              <Status v-if="currentTab == 1" />
            </cv-tab>
            <cv-tab label="Upcoming Election">
              <ElectionInfo v-if="currentTab == 2" />
            </cv-tab>
            <cv-tab
              label="Manage team"
              :disabled="userAccess.acl !== 'admin' && userAccess.acl !== 'editor'"
            >
              <ManageAccess v-if="currentTab == 3" />
            </cv-tab>
          </cv-tabs>
        </cv-column>
      </cv-row>
    </cv-grid>
  </div>
</template>

<script>
import AppHeader from '../../components/AppHeader';
import { mapState } from 'vuex';
const Badges = () => import('./Badges.vue');
const Status = () => import('./Status.vue');
const ElectionInfo = () => import('./Elections.vue');
const ManageAccess = () => import('./ManageAccess.vue');

export default {
  name: 'ActivitiesPage',
  components: {
    AppHeader,
    Badges,
    Status,
    ElectionInfo,
    ManageAccess
  },
  props: {
    teamId: { type: String, default: 'ymca-la' }
  },
  data: () => ({
    loadingData: false,
    loadedData: false,
    showError: false,
    currentTab: 0
  }),
  async created() {
    this.loadingData = true;
    this.loadedData = false;
    await this.$store.dispatch('loadCurrent', this.teamId);
    await this.$store.dispatch('loadAccess');

    // TODO: load team and details like badges

    // Finish loading animation
    this.loadingData = false;
  },

  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current,
      access: state => state.teams.access
    }),

    userAccess() {
      let doc = this.access.find(access => access.team === this.teamId);
      return doc || {};
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/skeleton/skeleton';
@import 'carbon-components/scss/components/loading/loading';

.team {
  margin-top: 4rem;
  &__title {
    @include carbon--type-style('productive-heading-03');
  }
  &__description {
    @include carbon--type-style('body-long-01');
  }
  &__badges {
    @include carbon--type-style('productive-heading-02');
    margin-bottom: 1rem;
  }
  &__badge {
    @include carbon--type-style('body-short-01');
  }
}
</style>
