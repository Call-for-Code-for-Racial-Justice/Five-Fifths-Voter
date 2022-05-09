<template>
  <div class="elections">
    <add-election v-if="isUserEditor" />
    <div v-if="elections.length === 0">
      No elections have been added to this team yet.
      <div v-if="isUserEditor">Try creating one now</div>
    </div>
    <cv-data-table :staticWidth="true" v-if="!loading" class="election-table">
      <template slot="headings">
        <cv-data-table-heading />
        <cv-data-table-heading heading="Name" />
        <cv-data-table-heading heading="Election day" />
        <cv-data-table-heading v-if="isUserEditor" />
        <cv-data-table-heading v-if="isUserEditor" />
      </template>
      <template slot="data">
        <cv-data-table-row v-for="row in elections" :key="row._id" :value="row._id">
          <cv-data-table-cell
            ><cv-checkbox
              :value="row._id"
              @change="actionSelect($event, row._id)"
              v-model="selectedElection[row._id]"
              :checked="row._id === selected"
              :hide-label="true"
            >
            </cv-checkbox
          ></cv-data-table-cell>
          <cv-data-table-cell>{{ row.name }}</cv-data-table-cell>
          <cv-data-table-cell>{{ row.election_day }}</cv-data-table-cell>
          <cv-data-table-cell v-if="isUserEditor"
            ><import-details :election="row"
          /></cv-data-table-cell>
          <cv-data-table-cell v-if="isUserEditor">
            <remove-election :election="row"></remove-election>
          </cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <contest-view :election="selected" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AddElection from './AddElection.vue';
import ImportDetails from './ImportDetails.vue';
import ContestView from './ContestView.vue';
import RemoveElection from '@/views/TeamPage/RemoveElection';

export default {
  name: 'ElectionInfo',
  components: { RemoveElection, AddElection, ImportDetails, ContestView },
  data: () => ({
    loading: true,
    selectedElection: {}
  }),
  async created() {
    this.loading = true;

    await this.$store.dispatch('loadTeamElections');

    this.loading = false;
  },
  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current,
      elections: state => state.teams.elections,
      selected: state => state.teams.current.election
    }),
    ...mapGetters({
      isUserEditor: 'isUserEditor'
    })
  },
  watch: {
    selected() {
      for (const [key] of Object.entries(this.selectedElection)) {
        this.$set(this.selectedElection, key, false);
      }
      this.$set(this.selectedElection, this.selected, true);
    }
  },
  methods: {
    actionSelect(checked, id) {
      this.$store.commit('selectElection', checked ? id : '');
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/theme';
@import 'carbon-components/scss/components/data-table/data-table';
@import 'carbon-components/scss/components/accordion/accordion';
</style>
