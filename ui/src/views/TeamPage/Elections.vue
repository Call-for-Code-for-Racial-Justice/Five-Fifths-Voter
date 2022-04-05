<template>
  <div>
    <div>General Primary Election</div>
    <div>May 24, 2022</div>
    <div>Early Voting Begins May 7</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ElectionInfo',
  components: {},
  data: () => ({}),
  async created() {},
  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current
    })
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
.team {
  &__elections {
    margin-left: 2rem;
  }
}
</style>
