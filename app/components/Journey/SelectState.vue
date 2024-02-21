<template>
  <div class="usa-state">
    <cv-select
      :label="'Switch location'"
      :value="usaState"
      size="sm"
      @change="onChange"
    >
      <cv-select-option
        v-for="opt in options"
        :key="`select-${opt.value}`"
        :value="opt.value"
        >{{ opt.label }}
      </cv-select-option>
    </cv-select>
  </div>
</template>

<script setup>
import usaStates from "@/assets/data/usa-states.json";
const user = useUser();
const usaState = computed(() => {
  return user.value?.info?.location?.region_code?.toLowerCase();
});
const options = computed(() => {
  return usaStates.map((e) => {
    return {
      value: e.region_code,
      label: e.region,
      name: e.region,
    };
  });
});
function onChange(val) {
  const location = usaStates.find((s) => s.region_code === val);
  if (location) setUserLocation(location);
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.usa-state {
  margin-bottom: 0.5rem;
  max-width: 15rem;
  .bx--label {
  }
}
</style>
