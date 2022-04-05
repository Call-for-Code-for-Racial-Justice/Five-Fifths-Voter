<template>
  <div class="team__access">
    <div>Manage Team Access</div>
    <cv-text-input
      class="team__access__input"
      label="email"
      placeholder="Add teammate email"
      v-model.trim="inviteEmail"
      :light="true"
    >
    </cv-text-input>
    <cv-dropdown class="team__access__input" v-model="inviteAccess" label="Access">
      <cv-dropdown-item value="Admin">Admin User</cv-dropdown-item>
      <cv-dropdown-item value="Teammate">Team Member</cv-dropdown-item>
    </cv-dropdown>
    <cv-button @click="addInvitation">
      Invite
    </cv-button>

    <cv-data-table :staticWidth="true">
      <template slot="headings">
        <cv-data-table-heading heading="Name" sortable />
        <cv-data-table-heading heading="Email" />
        <cv-data-table-heading heading="Access" />
        <cv-data-table-heading heading="Status" />
      </template>
      <template slot="data">
        <cv-data-table-row v-for="row in filteredData" :key="row.email" :value="row.email">
          <cv-data-table-cell>{{ row.name }}</cv-data-table-cell>
          <cv-data-table-cell>{{ row.email }}</cv-data-table-cell>
          <cv-data-table-cell>{{ row.access }}</cv-data-table-cell>
          <cv-data-table-cell>{{ row.status }}</cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ManageAccess',
  components: {},
  data: () => ({
    members: [],
    filteredData: [],
    // inputs
    inviteEmail: '',
    inviteAccess: 'Teammate'
  }),
  async created() {
    this.filteredData.push({
      name: this.user.name,
      email: this.user.email,
      access: 'Admin',
      status: 'Owner'
    });
  },
  computed: {
    ...mapState({
      user: state => state.user.info,
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current
    })
  },
  methods: {
    addInvitation() {
      let found = this.filteredData.find(member => member.email === this.inviteEmail);
      if (!found)
        this.filteredData.push({
          name: this.inviteEmail,
          email: this.inviteEmail,
          access: this.inviteAccess,
          status: 'Not joined'
        });
      this.inviteEmail = '';
      this.inviteAccess = 'Teammate';
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/data-table/data-table';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/text-input/text-input';

.team {
  &__access {
    margin-left: 2rem;
    &__input {
      max-width: 25rem;
    }
  }
}
</style>
