<template>
  <div class="add-contest">
    <cv-button
      :icon="iconBtn"
      small
      kind="primary"
      @click="actionShow"
      :disabled="!isGoogleElection"
      >Import Details</cv-button
    >
    <div ref="popup">
      <cv-modal
        class="add-contest__modal"
        close-aria-label="cancel delete"
        :visible="modalVisible"
        :primary-button-disabled="contests.length <= 0"
        @modal-shown="actionShown"
        @modal-hidden="actionHidden"
        @modal-hide-request="actionHideRequest"
        @after-modal-hidden="actionAfterHidden"
        @primary-click="actionAdd"
        :auto-hide-off="false"
        size="small"
      >
        <template slot="label">Import Election Contests</template>
        <template slot="title"
          >You can import what we we know about the {{ election.name }} or you can start from
          scratch</template
        >
        <template slot="content">
          <cv-grid>
            <cv-row>
              <cv-column :lg="11">
                <cv-inline-loading state="loading" v-if="loading"></cv-inline-loading>
                <cv-text-input label="Street Address" v-model="streetAddress"> </cv-text-input>
                <div class="add-contest__address-info">
                  We do not save your address. We just need it to find elections in your area.
                </div>
              </cv-column>
              <cv-column :lg="1">
                <cv-icon-button
                  class="add-contest__import"
                  :size="'sm'"
                  :disabled="streetAddress.length < 10"
                  :icon="iconImport"
                  :label="'Import'"
                  @click="getContests"
                />
              </cv-column>
            </cv-row>
            <cv-row v-if="contests.length > 0">
              <cv-column :lg="12">
                <div>Found these contests:</div>
                <div v-for="(contest, index) in contests" :key="`${index}-${contest.office}`">
                  {{ contest.office }}
                </div>
              </cv-column>
            </cv-row>
          </cv-grid>
        </template>
        <template slot="secondary-button">Cancel</template>
        <template slot="primary-button">Add</template>
      </cv-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { EventsAlt16, WorkspaceImport16 } from '@carbon/icons-vue';

import civicApi from '../../api/civic-api';
import electionsApi from '../../api/elections-api';

export default {
  name: 'AddElection',
  components: {},
  props: { election: Object },
  data: () => ({
    iconBtn: EventsAlt16,
    iconImport: WorkspaceImport16,
    modalVisible: false,
    modalEl: null,

    // civic data
    loading: false,
    contests: [],

    // inputs
    streetAddress: ''
  }),
  computed: {
    ...mapState({
      currentTeam: state => state.teams.current
    }),
    isGoogleElection() {
      return !isNaN(this.election.google_id) && Number.isInteger(Number(this.election.google_id));
    }
  },
  async created() {},
  beforeDestroy() {
    // move back to where it came from
    if (this.modalEl) {
      this.$el.appendChild(this.modalEl);
    }
  },
  methods: {
    actionShow() {
      this.modalVisible = true;

      // move popup out to body to ensure it behaves nicely
      if (!this.modalEl) {
        this.modalEl = document.body.appendChild(this.$refs.popup);
      }
    },
    actionShown() {
      this.modalVisible = true;
      this.googleId = Math.random().toString();
      this.electionName = '';
      this.electionDay = '';
      this.electionDivision = '';
    },
    actionHidden() {
      this.modalVisible = false;
    },
    actionHideRequest() {
      // console.log('actionHideRequest')
    },
    actionAfterHidden() {
      // console.log('actionAfterHidden')
    },
    async getContests() {
      this.loading = true;

      let details = await civicApi.getDetails(this.election.google_id, this.streetAddress);

      this.contests.slice(0);
      this.contests = details.contests;

      this.loading = false;
    },

    async actionAdd() {
      let contests = {
        team: this.currentTeam.slug,
        election: this.election._id,
        contests: this.contests
      };
      let resp = await electionsApi.addContests(this.currentTeam.slug, contests);

      if (resp) this.$store.commit('addTeamContestDocs', resp.doc);
      if (resp) this.$store.commit('selectElection', this.election._id);

      if (resp) this.modalVisible = false;
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/theme';
@import 'carbon-components/scss/components/modal/modal';
@import 'carbon-components/scss/components/tooltip/tooltip';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/inline-loading/inline-loading';

.add-contest {
  &__modal {
    padding-bottom: 2rem;
  }
  &__address-info {
    @include carbon--type-style('label-01');
  }
  &__import {
    margin-top: 1.75rem;
    margin-bottom: 3rem;
  }
}
</style>
