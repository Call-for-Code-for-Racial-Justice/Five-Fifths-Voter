<template>
  <div class="usa-state">
    <cv-select :label="'Choose a location'" :value="usaState" @change="onChange">
      <cv-select-option v-for="opt in options" :key="`select-${opt.value}`" :value="opt.value"
        >{{ opt.label }}
      </cv-select-option>
    </cv-select>
  </div>
</template>

<script>
import usaStates from '@/data/usa-states.json';
import { mapState } from 'vuex';

export default {
  name: 'SelectState',
  computed: {
    ...mapState({ usaState: (state) => state.user.info?.location?.region }),
    options() {
      return usaStates.map((e) => {
        return { value: e.region, label: e.region, name: e.region_code };
      });
    },
  },
  methods: {
    onChange(val) {
      const location = usaStates.find((s) => s.region === val);
      if (location) this.$store.commit('setLocation', location);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/_theme.scss';
.usa-state {
  margin-bottom: 0.5rem;
  max-width: 15rem;
  .bx--label {
  }
}
</style>
