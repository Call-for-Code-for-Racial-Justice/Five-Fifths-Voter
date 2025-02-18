<script setup>
// import { Map32 as MapIcon } from "@carbon/icons-vue";
import { useVoterInfoStore } from "~/stores/voterInfo";

const voterInfo = useVoterInfoStore();

const pollingLocations = computed(() => {
  return voterInfo.info?.pollingLocations || [];
});
const earlyVoteSites = computed(() => {
  return voterInfo.info?.earlyVoteSites || [];
});
const hasSites = computed(() => {
  return earlyVoteSites.value.length || earlyVoteSites.value.length;
});
/**
 * Create a Google link to directions
 */
// function directionsLink(item) {
//   let dir_address = "";
//   if (item.address.line1) dir_address += item.address.line1;
//   if (item.address.line2) dir_address += " " + item.address.line2;
//   if (item.address.line3) dir_address += " " + item.address.line3;
//   if (item.address.city) dir_address += " " + item.address.city;
//   if (item.address.state) dir_address += " " + item.address.state;
//   const escapedValue = encodeURIComponent(dir_address).replaceAll("%20", "+");
//   return "https://www.google.com/maps/search/?api=1&query=" + escapedValue;
// }
// function formatHours(hours) {
//   return (hours || "").split("\n");
// }

const dropOffLocations = computed(() => {
  return voterInfo.info?.dropOffLocations || [];
});
// const filteredDropOffLocationsLen = ref(3);
// const filteredDropOffLocations = computed(() => {
//   return dropOffLocations.value.slice(0, filteredDropOffLocationsLen.value);
// });
// const hasMoreDropOffLocations = computed(
//   () => filteredDropOffLocationsLen.value < dropOffLocations.value.length,
// );
// function moreDropOff() {
//   filteredDropOffLocationsLen.value += 3;
// }
</script>

<template>
  <div v-if="hasSites">
    <journey-locations
      :locations="earlyVoteSites"
      label="Early Voting Location"
    />
    <journey-locations
      :locations="pollingLocations"
      label="In Person Voting Locations"
    />
    <journey-locations
      :locations="dropOffLocations"
      label="Ballot drop-off Locations"
    />
  </div>
</template>

<style scoped lang="scss"></style>
