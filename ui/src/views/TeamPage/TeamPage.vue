<template>
  <div>
    <AppHeader />
    <cv-grid fullWidth class="team">
      <cv-row>
        <cv-column>
          <div class="activities__user">Welcome {{ given_name }}</div>
        </cv-column>
      </cv-row>
      <cv-row>
        <cv-column :lg="10">
          <div class="team__description">
            {{ currentTeam.description }}
          </div>
          <div class="team__badges">
            You have earned
            {{ currentTeam.badges }} badges <Badge32 />
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 0">
            <Sprout32 /> Congratutaions on joining our team
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 1">
            <Account32 />You contributed money to a non-profit
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 2">
            <Apple32 />You helped someone with voting technology
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 3">
            <Basketball32 />You told your teammates about the next election
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 4">
            <Bat32 />You are a voint super hero!
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 5">
            <Corn32 />You planted voting seeds at your school
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 6">
            <FruitBowl32 />You invited someone to join your voting team
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 7">
            <PiggyBankSlot32 />You helped a candidate raise money
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 8">
            <Monster32 />You helped get out the vote
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 9">
            <Gift32 />You voted in an election
          </div>
          <div class="team__badge" v-if="currentTeam.badges > 10">
            <NoodleBowl32 />You brought someone to a polling place
          </div>
        </cv-column>
      </cv-row>
    </cv-grid>
  </div>
</template>

<script>
import AppHeader from '../../components/AppHeader';
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
  name: 'ActivitiesPage',
  components: {
    AppHeader,
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
  props: {
    teamId: { type: String, default: 'ymca-la' }
  },
  data: () => ({
    teams: [
      { name: 'YMCA LA', _id: 'team:ymca-la', description: 'Welcome to the YMCA LA', badges: 10 },
      {
        name: 'YMCA NYC',
        _id: 'team:ymca-nyc',
        description: 'Welcome to the YMCA NYC',
        badges: 11
      },
      {
        name: 'League Of Women Voters - Austin',
        _id: 'team:league-of-women-voters-austin',
        description:
          'Empowering Voters. Defending Democracy. The League of Women Voters is a nonpartisan, grassroots organization working to protect and expand voting rights and ensure everyone is represented in our democracy. We empower voters and defend democracy through advocacy, education, and litigation, at the local, state, and national levels.',
        badges: 4
      },
      {
        name: 'Roswell HS',
        _id: 'team:roswell-hs',
        description:
          'Welcome to the Roswell Highschool Civics Club. Participate in your community! Vote!',
        badges: 1
      },
      {
        name: 'Scout Troop 989',
        _id: 'team:troop989',
        description: 'Welcome to Scout Troop 989 - Earn you Citizenship in Society Merit Badge',
        badges: 1
      }
    ]
  }),

  computed: {
    currentTeam() {
      return this.teams.find(team => team._id === `team:${this.teamId}`);
    },
    ...mapState({
      given_name: state => state.user.info.given_name
    })
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';

.team {
  margin-top: 4rem;
  &__description {
    @include carbon--type-style('body-long-01');
  }
  &__badges {
    @include carbon--type-style('productive-heading-02');
    margin-bottom: 1rem;
  }
  &__badge {
    @include carbon--type-style('body-short-01');
  }
}
</style>
