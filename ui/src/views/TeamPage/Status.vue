<template>
  <div class="team__status">
    <ccv-donut-chart :data="data" :options="options"></ccv-donut-chart>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import '@carbon/charts/styles.css';
import { CcvDonutChart } from '@carbon/charts-vue';

export default {
  name: 'VoterBadges',
  components: {
    CcvDonutChart
  },
  data() {
    return {
      data: [
        {
          group: '2V2N 9KYPM version 1',
          value: 20000
        },
        {
          group: 'L22I P66EP L22I P66EP L22I P66EP',
          value: 65000
        },
        {
          group: 'JQAI 2M4L1',
          value: 75000
        },
        {
          group: 'J9DZ F37AP',
          value: 1200
        },
        {
          group: 'YEL48 Q6XK YEL48',
          value: 10000
        },
        {
          group: 'Misc',
          value: 25000
        }
      ],
      options: {
        title: 'Donut',
        resizable: true,
        donut: {
          center: {
            label: 'Browsers'
          }
        },
        height: '400px'
      }
    };
  },
  async created() {
    this.badges = Math.floor(Math.random() * 11);
  },
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
  &__status {
    margin-top: 4rem;
  }
}
</style>
