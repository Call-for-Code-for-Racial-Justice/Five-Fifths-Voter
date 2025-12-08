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
</script>

<template>
  <ClientOnly>
    <div class="usa-state">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('journeyPageElectionStateSwitch') }}</legend>
        <select
            id="state-select"
            v-model="usaState"
            class="select select-sm w-full"
        >
          <option v-for="opt in options" :key="`select-${opt.value}`" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </fieldset>
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
