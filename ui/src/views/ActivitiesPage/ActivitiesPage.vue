<template>
  <div>
    <AppHeader />
    <cv-grid fullWidth class="activities">
      <cv-row>
        <cv-column>
          <div class="activities__user">Welcome {{ given_name }}</div>
        </cv-column>
      </cv-row>
      <cv-row>
        <cv-column :lg="10">
          <div class="activities__yours">Your Election Teams</div>
          <cv-list :ordered="false">
            <cv-list-item v-for="team in yours" :key="team._id">
              <cv-link
                :to="{ name: 'team', params: { teamId: team._id.split(':')[1] } }"
                :inline="true"
              >
                {{ team.name }}
              </cv-link>
            </cv-list-item>
          </cv-list>
          <div class="activities__invitations">Your Invitations</div>
          <cv-list :ordered="false">
            <cv-list-item v-for="team in invitations" :key="team._id">
              <div>{{ team.name }}</div>
              <cv-button size="sm" @click="actionAcceptInvitation(team._id)">
                Accept Invitation
              </cv-button>
            </cv-list-item>
          </cv-list>
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
import { mapState } from 'vuex';

export default {
  name: 'ActivitiesPage',
  components: {
    AppHeader
  },
  data: () => ({
    message: 'Hello world',
    yours: [
      { name: 'YMCA LA', _id: 'team:ymca-la' },
      { name: 'YMCA NYC', _id: 'team:ymca-nyc' },
      { name: 'League Of Women Voters - Austin', _id: 'team:league-of-women-voters-austin' }
    ],
    invitations: [
      { name: 'Roswell HS', _id: 'team:roswell-hs' },
      { name: 'Scout Troop 989', _id: 'team:troop989' }
    ]
  }),
  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name
    })
  },
  methods: {
    async actionAcceptInvitation(id) {
      // TODO: call accept API
      this.$router.push({ name: 'team', params: { teamId: id.split(':')[1] } });
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/list/list';
@import 'carbon-components/scss/components/link/link';
@import 'carbon-components/scss/components/button/button';

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
