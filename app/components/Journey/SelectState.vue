<script setup>
import usaStates from "@/assets/data/usa-states.json";

const usaState = useLocalStorage(LOCAL_STORAGE_KEYS.USA_STATE, "");

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
  const location = usaStates.find(s => s.region_code === val);
  if (location) usaState.value = location.region_code;
}
</script>

<template>
  <ClientOnly>
    <div class="usa-state">
      <cv-select
        :label="$t('journeyPageElectionStateSwitch')"
        :value="usaState"
        size="sm"
        @change="onChange"
      >
        <cv-select-option
          v-for="opt in options"
          :key="`select-${opt.value}`"
          :value="opt.value"
        >
          {{ opt.label }}
        </cv-select-option>
      </cv-select>
    </div>
  </ClientOnly>
</template>

<style scoped lang="css">
.usa-state {
  margin-bottom: 0.5rem;
  max-width: 15rem;
  .bx--label {
  }
}
</style>
