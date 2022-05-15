<template>
  <div class="my-list">
    <div class="my-list__title">
      My List
    </div>
    <div class="my-list__data">
      No one can see this information except you. Your team leader does not have access to this.
      Also, we do not store this information except in your local browser.
    </div>
    <cv-data-table :staticWidth="true" :zebra="true" class="contest-view__candidates">
      <template slot="headings">
        <cv-data-table-heading heading="Office" />
        <cv-data-table-heading heading="Name" />
        <cv-data-table-heading heading="Party" />
        <cv-data-table-heading heading="Url" />
        <cv-data-table-heading heading="Phone" />
        <cv-data-table-heading heading="Email" />
        <cv-data-table-heading />
      </template>
      <template slot="data">
        <cv-data-table-row v-for="office in offices" :key="office">
          <cv-data-table-cell>{{ votes[office].office }}</cv-data-table-cell>
          <cv-data-table-cell>{{ votes[office].name }}</cv-data-table-cell>
          <cv-data-table-cell>{{ votes[office].party }}</cv-data-table-cell>
          <cv-data-table-cell>{{ votes[office].candidateUrl }}</cv-data-table-cell>
          <cv-data-table-cell>{{ votes[office].phone }}</cv-data-table-cell>
          <cv-data-table-cell>{{ votes[office].email }}</cv-data-table-cell>
          <cv-data-table-cell
            ><cv-icon-button
              class="my-list__left"
              :kind="'danger--ghost'"
              :size="'sm'"
              :icon="iconRemove"
              :label="'Remove from my list'"
              :tip-position="'left'"
              @click="actionRemoveVote(office)"
          /></cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Close16 } from '@carbon/icons-vue';
import badgesApi from '../../api/badges-api';

export default {
  name: 'MyList',
  components: {},
  data: () => ({
    iconRemove: Close16
  }),
  async created() {
    this.$store.commit('loadLocal');

    if (this.offices.length > 0) {
      await badgesApi.madeList();
    }
  },
  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current,
      local: state => state.teams.local,
      votes: state => state.teams.local.votes
    }),
    offices() {
      try {
        return Object.keys(this.local.votes);
      } catch (error) {
        return [];
      }
    }
  },
  methods: {
    async actionRemoveVote(office) {
      await this.$store.dispatch('removeVote', office);
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/theme';
@import 'carbon-components/scss/components/data-table/data-table';
@import 'carbon-components/scss/components/button/button';
.my-list {
  margin-top: 4rem;
  margin-left: 4rem;
  &__title {
    @include carbon--type-style('productive-heading-02');
  }
  &__data {
    @include carbon--type-style('label-01');
  }
  &__left {
    .bx--assistive-text {
      transform: translate(-100%, -50%) !important;
    }
  }
}
</style>
