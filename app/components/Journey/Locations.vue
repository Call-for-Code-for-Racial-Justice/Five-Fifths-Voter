<script setup>
defineOptions({
  name: "JourneyLocations",
});
const props = defineProps({
  label: { type: String, required: true },
  locations: { type: Array, required: true },
});

const expandedLocation = ref("");
provide("expanded-location", expandedLocation);

const filteredLen = ref(3);
const filtered = computed(() => {
  return props.locations.slice(0, filteredLen.value);
});
const hasMoreLocations = computed(
  () => filteredLen.value < props.locations.length,
);

function showMore() {
  filteredLen.value += 3;
}
</script>

<template>
  <div v-if="locations.length > 0">
    <div class="text-lg">
      {{ label }}
    </div>
    <div class="m-2 space-y-2">
      <journey-location
        v-for="(item, index) in filtered"
        :key="`ev-${index}`"
        :location="item"
      />
      <cv-button
        v-if="hasMoreLocations"
        kind="tertiary"
        size="sm"
        @click="showMore"
      >
        Show more locations
      </cv-button>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
