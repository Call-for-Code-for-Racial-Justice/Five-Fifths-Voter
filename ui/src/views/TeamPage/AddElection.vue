<template>
  <div class="add-election">
    <cv-button :icon="iconBtn" small kind="primary" @click="actionShow">Add Election</cv-button>
    <div ref="popup">
      <cv-modal
        class="add-election__modal"
        close-aria-label="cancel delete"
        :visible="modalVisible"
        @modal-shown="actionShown"
        @modal-hidden="actionHidden"
        @modal-hide-request="actionHideRequest"
        @after-modal-hidden="actionAfterHidden"
        @primary-click="actionAddElection"
        :auto-hide-off="false"
        size="small"
      >
        <template slot="label">Add or Import Election</template>
        <template slot="title"
          >You can import what we we know about elections or you can start from scratch</template
        >
        <template slot="content">
          <cv-inline-loading state="loading" v-if="loadingKnown"></cv-inline-loading>
          <cv-dropdown
            v-else
            label="Start with one of these (Optional)"
            placeholder="Select election"
            @change="selectElection"
          >
            <cv-dropdown-item
              v-for="election in knownElections"
              :key="election.id"
              :value="election.id"
              >{{ election.name }}</cv-dropdown-item
            >
          </cv-dropdown>
          <cv-text-input label="Election Name" v-model="electionName" ref="firstInput">
          </cv-text-input>
          <cv-text-input label="Election Day" v-model="electionDay"> </cv-text-input>
          <cv-text-input label="Election Division" v-model="electionDivision"> </cv-text-input>
          <div style="height:10rem;" />
        </template>
        <template slot="secondary-button">Cancel</template>
        <template slot="primary-button">Add</template>
      </cv-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { AddAlt16 } from '@carbon/icons-vue';
import { v4 as uuid } from 'uuid';
import civicApi from '../../api/civic-api';
import electionsApi from '../../api/elections-api';

export default {
  name: 'AddElection',
  components: {},
  data: () => ({
    iconBtn: AddAlt16,
    modalVisible: false,
    modalEl: null,

    // civic data
    loadingKnown: false,
    knownElections: [],

    // inputs
    googleId: '',
    electionName: '',
    electionDay: '',
    electionDivision: ''
  }),
  computed: {
    ...mapState({
      currentTeam: state => state.teams.current
    })
  },
  async created() {
    this.loadingKnown = true;
    let list = await civicApi.getElections();

    this.knownElections = list.elections;

    this.loadingKnown = false;
  },
  beforeDestroy() {
    // move back to where it came from
    if (this.modalEl) {
      this.$el.appendChild(this.modalEl);
    }
  },
  methods: {
    actionShow() {
      // move popup out to body to ensure it behaves nicely
      if (!this.modalEl) {
        this.modalEl = document.body.appendChild(this.$refs.popup);
        setTimeout(() => (this.modalVisible = true), 100);
      } else this.modalVisible = true;
    },
    actionShown() {
      this.modalVisible = true;
      this.googleId = '';
      this.electionName = '';
      this.electionDay = '';
      this.electionDivision = '';
      this.$refs?.firstInput?.focus();
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
    async actionAddElection() {
      let election = {
        name: this.electionName,
        team: this.currentTeam.slug,
        google_id: this.googleId || uuid(),
        election_day: this.electionDay,
        division: this.electionDivision
      };
      let resp = await electionsApi.create(election);
      this.$store.commit('addTeamElectionDocs', resp.doc);

      if (resp) this.modalVisible = false;
    },
    selectElection(val) {
      let election = this.knownElections.find(doc => doc.id === val);
      if (election) {
        this.electionName = election.name;
        this.electionDay = election.electionDay;
        this.electionDivision = election.ocdDivisionId;
        this.googleId = election.id;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/modal/modal';
@import 'carbon-components/scss/components/dropdown/dropdown';
@import 'carbon-components/scss/components/inline-loading/inline-loading';

.add-election {
  &__modal {
    padding-bottom: 2rem;
  }
}
</style>
