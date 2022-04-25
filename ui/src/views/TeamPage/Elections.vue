<template>
  <div>
    <add-election v-if="isUserEditor" />
    <div v-if="elections.length === 0">
      No elections have been added to this team yet.
      <div v-if="isUserEditor">Try creating one now</div>
    </div>
    <cv-data-table :staticWidth="true" v-if="!loading">
      <template slot="headings">
        <cv-data-table-heading heading="Name" />
        <cv-data-table-heading heading="Election day" />
        <cv-data-table-heading v-if="isUserEditor" />
      </template>
      <template slot="data">
        <cv-data-table-row v-for="row in elections" :key="row._id" :value="row._id">
          <cv-data-table-cell>{{ row.name }}</cv-data-table-cell>
          <cv-data-table-cell>{{ row.election_day }}</cv-data-table-cell>
          <cv-data-table-cell
            ><import-details v-if="isUserEditor" :election="row"
          /></cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <contest-view :election="selectedElection" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AddElection from './AddElection.vue';
import ImportDetails from './ImportDetails.vue';
import electionsApi from '../../api/elections-api';
import ContestView from './ContestView.vue';

export default {
  name: 'ElectionInfo',
  components: { AddElection, ImportDetails, ContestView },
  data: () => ({
    loading: true,
    elections: [],
    selectedElection: {}
  }),
  async created() {
    this.loading = true;

    this.elections = await electionsApi.get(this.currentTeam.slug);

    this.loading = false;
  },
  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current
    }),
    ...mapGetters({
      isUserEditor: 'isUserEditor'
    })
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/data-table/data-table';
@import 'carbon-components/scss/components/accordion/accordion';

.team {
  &__elections {
    margin-left: 2rem;
  }
}
</style>
