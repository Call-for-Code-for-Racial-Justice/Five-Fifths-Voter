<template>
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
  </div>
</template>

<script>
import StateIcon from './StateIcon';
import usaStates from './usa-states.json';

export default {
  name: 'StatePage',
  components: { StateIcon },
  data() {
    return {
      filter: '',
      which: 'Georgia',
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
.usa-state {
  &__nav-form {
    position: absolute;
    right: 2rem;
    top: 4rem;
    max-width: 20rem;
  }
}
</style>
