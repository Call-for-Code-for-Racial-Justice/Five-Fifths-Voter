<template>
  <div class="team__access">
    <div>Manage Team Access</div>
    <cv-text-input
      class="team__access__input"
      label="email"
      placeholder="Add teammate email"
      v-model.trim="inviteEmail"
      :light="true"
      :disabled="adding"
    >
    </cv-text-input>
    <cv-dropdown
      class="team__access__input"
      v-model="inviteAccess"
      label="Access"
      :disabled="adding"
    >
      <cv-dropdown-item value="admin">Team Administrator</cv-dropdown-item>
      <cv-dropdown-item value="editor">Team Editor</cv-dropdown-item>
      <cv-dropdown-item value="user">Team Member</cv-dropdown-item>
    </cv-dropdown>
    <cv-button @click="addInvitation" :disabled="adding">
      Invite
    </cv-button>
    <cv-inline-loading
      v-if="addingState"
      ending-text="..."
      error-text="could not invite user"
      loading-text="adding user ..."
      loaded-text="added user"
      :state="addingState"
    ></cv-inline-loading>
    <cv-data-table :staticWidth="true">
      <template slot="headings">
        <cv-data-table-heading heading="Email" />
        <cv-data-table-heading heading="Access" />
        <cv-data-table-heading heading="Status" />
      </template>
      <template slot="data">
        <cv-data-table-row v-for="row in filteredData" :key="row.email" :value="row.email">
          <cv-data-table-cell>{{ row.email }}</cv-data-table-cell>
          <cv-data-table-cell>{{ row.acl }}</cv-data-table-cell>
          <cv-data-table-cell>{{ row.status }}</cv-data-table-cell>
          <cv-data-table-cell
            ><remove-member :person="row" v-if="row.email !== user.email"
          /></cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RemoveMember from './RemoveMember.vue';

export default {
  name: 'ManageAccess',
  components: { RemoveMember },
  data: () => ({
    members: [],
    // inputs
    inviteEmail: '',
    inviteAccess: 'user',
    addingState: undefined
  }),
  async created() {
    await this.$store.dispatch('loadTeamAccess');
  },
  computed: {
    ...mapState({
      user: state => state.user.info,
      currentTeam: state => state.teams.current,
      teamAccess: state => state.teams.teamAccess
    }),
    filteredData() {
      return this.teamAccess.filter(doc => doc.acl !== 'removed');
    },
    adding() {
      return ['loading', 'ending', 'error'].includes(this.addingState);
    }
  },
  methods: {
    async addInvitation() {
      let added = await this.$store.dispatch('sendTeamInvite', {
        email: this.inviteEmail,
        acl: this.inviteAccess,
        status: 'invited'
      });

      if (added) {
        this.inviteEmail = '';
        this.inviteAccess = 'user';
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/data-table/data-table';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/text-input/text-input';
@import 'carbon-components/scss/components/inline-loading/inline-loading';

.team {
  &__access {
    margin-left: 2rem;
    &__input {
      max-width: 25rem;
    }
  }
}
</style>
