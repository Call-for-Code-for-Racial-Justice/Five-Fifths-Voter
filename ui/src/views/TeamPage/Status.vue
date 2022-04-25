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
          group: 'Badges',
          value: 55
        },
        {
          group: 'Registrations',
          value: 112
        },
        {
          group: 'Door Knocks',
          value: 76
        }
      ],
      options: {
        title: 'Team Goals',
        resizable: true,
        donut: {
          center: {
            label: 'Vote Together'
          }
        },
        height: '400px'
      }
    };
  },
  async created() {
    window.addEventListener('resize', this.actionResize);
    this.actionResize();
  },
  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current
    })
  },
  methods: {
    actionResize() {
      this.$set(this.options, 'height', `${window.innerHeight * 0.5}px`);
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
.team {
  &__status {
    margin-top: 4rem;
    margin-left: 4rem;
  }
}
</style>
