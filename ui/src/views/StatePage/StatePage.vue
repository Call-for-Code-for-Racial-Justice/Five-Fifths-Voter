<template>
  <cv-grid class="bx--no-gutter" style="padding-top: 3rem">
    <cv-column class="bx--no-gutter" style="padding-top: 0" :lg="4" :md="8" :sm="4">
      <div class="usa-state">
        <div class="usa-state__nav-form">
          <cv-combo-box
            :auto-filter="true"
            :options="options"
            v-model="which"
            :label="'Choose a location'"
            @change="onChange"
          >
          </cv-combo-box>
        </div>
        <state-icon :which="whichCode" @change-region="onRegion" />
        <!-- Core races-->
        <cv-tile
          v-if="whichCode"
          kind="expandable"
          tile-collapsed-label=""
          tile-expanded-label=""
          :light="true"
          class="usa-state__info"
          :key="`core-voting-${whichCode}`"
        >
          <h4>Key Races in {{ which }}</h4>
          <template v-slot:below>
            <cv-list :ordered="false">
              <cv-list-item v-for="r in coreRaces" :key="`core-race-${whichCode}-${r}`"
                >{{ r }}
              </cv-list-item>
            </cv-list>
          </template>
        </cv-tile>

        <!-- Early Voting-->
        <cv-tile
          v-if="whichCode"
          kind="expandable"
          tile-collapsed-label=""
          tile-expanded-label=""
          :light="true"
          class="usa-state__info"
          :key="`early-voting-${whichCode}`"
        >
          <h4>Early Voting</h4>

          <div v-if="earlyVoting.length === 0">No information available</div>
          <template v-slot:below>
            <div v-for="q in earlyVoting" :key="q.id" class="usa-state__info__faq">
              <div>{{ q.question }}</div>
              <mark-down :content="q.answer" />
            </div>
          </template>
        </cv-tile>
      </div>
    </cv-column>
  </cv-grid>
</template>

<script>
import StateIcon from './StateIcon';
import usaStates from '@/data/usa-states.json';
import midterms2022 from '@/data/usa-2022-midterms-runoff.json';
import MarkDown from '../../components/MarkDown';

export default {
  name: 'StatePage',
  components: { StateIcon, MarkDown },
  data() {
    return {
      filter: '',
      which: '',
      location: {},
    };
  },
  computed: {
    options() {
      return usaStates.map((e) => {
        return { value: e.region, label: e.region, name: e.region_code };
      });
    },
    whichCode() {
      const found = usaStates.find((e) => e.region === this.which);
      return found?.region_code || '';
    },
    earlyVoting() {
      return midterms2022[this.whichCode]?.early_voting_faq || [];
    },
    coreRaces() {
      return midterms2022[this.whichCode]?.core_races?.answer || [];
    },
  },
  created() {
    fetch('https://ipapi.co/json/').then((resp) => {
      resp.json().then((data) => {
        this.location = data;
        this.which = this.location.region;
      });
    });
  },
  methods: {
    onChange() {
      document.activeElement.blur();
    },
    onRegion(val) {
      this.filter = '';
      const found = usaStates.find((e) => e.region_code === val);
      this.which = found?.region;
    },
  },
};
</script>

<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/vars.scss';
@import 'carbon-components/scss/globals/scss/typography.scss';
.usa-state {
  &__nav-form {
    position: absolute;
    right: 2rem;
    top: 4rem;
    max-width: 20rem;
    z-index: 10;
    @include carbon--breakpoint-down(lg) {
      position: relative;
      top: unset;
      right: unset;
      margin-left: 0.5rem;
      margin-top: 0.5rem;
    }
  }
  &__info {
    margin-top: 2rem;
    width: 100%;
    @include carbon--breakpoint-down(lg) {
      margin-top: 1rem;
      width: calc(100% - 1rem);
    }
    margin-left: 0.5rem;
    z-index: 1000;
    height: fit-content;
    background-color: rgba(120, 169, 256, 0.95);
    &__faq {
      div:nth-child(1) {
        @include carbon--type-style('productive-heading-01');
      }
    }
  }
}
</style>
