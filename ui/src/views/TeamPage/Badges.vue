<template>
  <div>
    <div class="team__badges">
      You have earned
      {{ badges }} badges <Badge32 />
    </div>
    <div class="team__badge" v-if="badges > 0">
      <Sprout32 /> Congratulations on joining our team
    </div>
    <div class="team__badge" v-if="badges > 1">
      <Account32 />You contributed money to a non-profit
    </div>
    <div class="team__badge" v-if="badges > 2">
      <Apple32 />You helped someone with voting technology
    </div>
    <div class="team__badge" v-if="badges > 3">
      <Basketball32 />You told your teammates about the next election
    </div>
    <div class="team__badge" v-if="badges > 4"><Bat32 />You are a voint super hero!</div>
    <div class="team__badge" v-if="badges > 5">
      <Corn32 />You planted voting seeds at your school
    </div>
    <div class="team__badge" v-if="badges > 6">
      <FruitBowl32 />You invited someone to join your voting team
    </div>
    <div class="team__badge" v-if="badges > 7">
      <PiggyBankSlot32 />You helped a candidate raise money
    </div>
    <div class="team__badge" v-if="badges > 8"><Monster32 />You helped get out the vote</div>
    <div class="team__badge" v-if="badges > 9"><Gift32 />You voted in an election</div>
    <div class="team__badge" v-if="badges > 10">
      <NoodleBowl32 />You brought someone to a polling place
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  Badge32,
  Sprout32,
  Account32,
  Apple32,
  Basketball32,
  Bat32,
  Corn32,
  FruitBowl32,
  PiggyBankSlot32,
  Monster32,
  Gift32,
  NoodleBowl32
} from '@carbon/icons-vue';
export default {
  name: 'VoterBadges',
  components: {
    Badge32,
    Sprout32,
    Account32,
    Apple32,
    Basketball32,
    Bat32,
    Corn32,
    FruitBowl32,
    PiggyBankSlot32,
    Monster32,
    Gift32,
    NoodleBowl32
  },
  data: () => ({
    badges: 1
  }),
  async created() {
    this.badges = 2 + Math.floor(Math.random() * 11);
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
  margin-top: 4rem;
  &__badges {
    @include carbon--type-style('productive-heading-02');
    margin-bottom: 1rem;
    margin-left: 2rem;
  }
}
</style>
