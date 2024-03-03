<template>
  <div v-if="hasSites">
    <div class="text-lg">Early Voting Location</div>
    <div class="m-2 space-y-2">
      <div
        v-for="(item, index) in earlyVoteSites"
        :key="`ev-${index}`"
        class="group flex flex-col gap-2 rounded-lg bg-[#393939] p-5 text-white"
        tabindex="1"
      >
        <div class="flex cursor-pointer items-center justify-between">
          <span> {{ item.address.locationName }} </span>
          <chevron
            class="transition-all duration-500 group-focus:-rotate-180"
          />
        </div>
        <div
          class="invisible h-auto max-h-0 items-center opacity-0 transition-all
            group-focus:visible group-focus:max-h-screen group-focus:opacity-100
            group-focus:duration-1000"
        >
          <span v-if="item.address.line1">{{ item.address.line1 }}</span>

          <span v-if="item.address.line2" class="ml-1">{{
            item.address.line2
          }}</span>

          <span v-if="item.address.line3" class="ml-1">{{
            item.address.line3
          }}</span>

          <span v-if="item.address.city" class="ml-1">{{
            item.address.city
          }}</span>

          <span v-if="item.address.state" class="ml-1">
            {{ item.address.state }}
          </span>

          <div class="mt-1">
            <cv-link :href="directionsLink(item)" target="_blank">
              <div><map-icon /></div>
              <div class="ml-2 flex items-center">
                {{ $t("mapDirections") }}
              </div>
            </cv-link>
          </div>
          <div v-if="item.notes" class="mt-1 text-[16px]">{{ item.notes }}</div>
        </div>
      </div>
    </div>
    <div class="text-lg">In Person Voting Locations</div>
    <div class="m-2 space-y-2">
      <div
        v-for="(item, index) in pollingLocations"
        :key="`pl-${index}`"
        class="group flex flex-col gap-2 rounded-lg bg-[#393939] p-5 text-white"
        tabindex="1"
      >
        <div class="flex cursor-pointer items-center justify-between">
          <span> {{ item.address.locationName }} </span>
          <chevron
            class="transition-all duration-500 group-focus:-rotate-180"
          />
        </div>
        <div
          class="invisible h-auto max-h-0 items-center opacity-0 transition-all
            group-focus:visible group-focus:max-h-screen group-focus:opacity-100
            group-focus:duration-1000"
        >
          <span v-if="item.address.line1">{{ item.address.line1 }}</span>

          <span v-if="item.address.line2" class="ml-1">{{
            item.address.line2
          }}</span>

          <span v-if="item.address.line3" class="ml-1">{{
            item.address.line3
          }}</span>

          <span v-if="item.address.city" class="ml-1">{{
            item.address.city
          }}</span>

          <span v-if="item.address.state" class="ml-1">
            {{ item.address.state }}
          </span>

          <div class="mt-1">
            <cv-link :href="directionsLink(item)" target="_blank">
              <div><map-icon /></div>
              <div class="ml-2 flex items-center">
                {{ $t("mapDirections") }}
              </div>
            </cv-link>
          </div>
          <div v-if="item.notes" class="mt-1 text-[16px]">{{ item.notes }}</div>
        </div>
      </div>
    </div>
    <div class="text-lg">Ballot drop-off Locations</div>
    <div class="m-2 space-y-2">
      <div
        v-for="(item, index) in filteredDropOffLocations"
        :key="`pl-${index}`"
        class="group flex flex-col gap-2 rounded-lg bg-[#393939] p-5 text-white"
        tabindex="1"
      >
        <div class="flex cursor-pointer items-center justify-between">
          <span> {{ item.address.locationName }} </span>
          <chevron
            class="transition-all duration-500 group-focus:-rotate-180"
          />
        </div>
        <div
          class="invisible h-auto max-h-0 items-center opacity-0 transition-all
            group-focus:visible group-focus:max-h-screen group-focus:opacity-100
            group-focus:duration-1000"
        >
          <span v-if="item.address.line1">{{ item.address.line1 }}</span>

          <span v-if="item.address.line2" class="ml-1">{{
            item.address.line2
          }}</span>

          <span v-if="item.address.line3" class="ml-1">{{
            item.address.line3
          }}</span>

          <span v-if="item.address.city" class="ml-1">{{
            item.address.city
          }}</span>

          <span v-if="item.address.state" class="ml-1">
            {{ item.address.state }}
          </span>

          <div class="mt-1">
            <cv-link :href="directionsLink(item)" target="_blank">
              <div><map-icon /></div>
              <div class="ml-2 flex items-center">
                {{ $t("mapDirections") }}
              </div>
            </cv-link>
          </div>
          <div v-if="item.notes" class="mt-1 text-[16px]">{{ item.notes }}</div>
        </div>
      </div>
    </div>
    <cv-button
      v-if="hasMoreDropOffLocations"
      kind="tertiary"
      size="sm"
      @click="moreDropOff"
      >Show more locations</cv-button
    >
  </div>
  <cv-accordion v-if="false">
    <cv-accordion-item v-if="earlyVoteSites.length" :open="false">
      <template #title>Early Voting Location</template>
      <template #content>
        <cv-list>
          <cv-list-item v-for="(item, index) in earlyVoteSites" :key="index">
            <span class="loc-name">{{ item.address.locationName }}</span>

            <span v-if="item.address.line1" class="loc-line">{{
              item.address.line1
            }}</span>
            <span v-if="item.address.line2" class="loc-line">{{
              item.address.line2
            }}</span>
            <span v-if="item.address.line3" class="loc-line">{{
              item.address.line3
            }}</span>
            <span v-if="item.address.city" class="loc-city">{{
              item.address.city
            }}</span>
            <span v-if="item.address.state" class="loc-state">
              {{ item.address.state }}
            </span>
            <div>
              <cv-link :href="directionsLink(item)" target="_blank">
                <map-icon style="color: #0f62fe" />
                <span class="location__directions">{{
                  $t("mapDirections")
                }}</span>
              </cv-link>
            </div>

            <!-- hours -->
            <div
              v-for="(h, hi) in formatHours(item.pollingHours)"
              :key="`${item.address}-h${hi}`"
            >
              <span class="loc-line">{{ h }}</span>
            </div>
          </cv-list-item>
        </cv-list>
      </template>
    </cv-accordion-item>
    <cv-accordion-item v-if="pollingLocations.length" :open="false">
      <template #title>Election Day Voting Location</template>
      <template #content>
        <cv-list>
          <cv-list-item v-for="(item, index) in pollingLocations" :key="index">
            <span class="loc-name">{{ item.address.locationName }}</span>
            <span v-if="item.address.line1" class="loc-line">{{
              item.address.line1
            }}</span>
            <span v-if="item.address.line2" class="loc-line">{{
              item.address.line2
            }}</span>
            <span v-if="item.address.line3" class="loc-line">{{
              item.address.line3
            }}</span>
            <span v-if="item.address.city" class="loc-city">{{
              item.address.city
            }}</span>
            <span v-if="item.address.state" class="loc-state">
              {{ item.address.state }}
            </span>
            <div>
              <cv-link :href="directionsLink(item)" target="_blank">
                <map-icon style="color: #0f62fe" />
                <span class="location__directions">{{
                  $t("mapDirections")
                }}</span>
              </cv-link>
            </div>

            <!-- hours -->
            <div
              v-for="(h, hi) in formatHours(item.pollingHours)"
              :key="`${item.address}-h${hi}`"
            >
              <span class="loc-line">{{ h }}</span>
            </div>
          </cv-list-item>
        </cv-list>
      </template>
    </cv-accordion-item>
    <cv-accordion-item v-if="dropOffLocations.length" :open="false">
      <template #title>Ballot Drop-off locations</template>
      <template #content>
        <cv-list>
          <cv-list-item v-for="(item, index) in dropOffLocations" :key="index">
            <span class="loc-name">{{ item.address.locationName }}</span>
            <span v-if="item.pollingHours" class="loc-name">{{
              item.pollingHours
            }}</span>

            <span v-if="item.address.line1" class="loc-line">{{
              item.address.line1
            }}</span>
            <span v-if="item.address.line2" class="loc-line">{{
              item.address.line2
            }}</span>
            <span v-if="item.address.line3" class="loc-line">{{
              item.address.line3
            }}</span>
            <span v-if="item.address.city" class="loc-city">{{
              item.address.city
            }}</span>
            <span v-if="item.address.state" class="loc-state">
              {{ item.address.state }}
            </span>
            <cv-link :href="directionsLink(item)" target="_blank">
              <map-icon style="color: #0f62fe" />
              <span class="location__directions">{{
                $t("mapDirections")
              }}</span>
            </cv-link>
          </cv-list-item>
        </cv-list>
      </template>
    </cv-accordion-item>
  </cv-accordion>
</template>

<script setup>
import { Map32 as MapIcon, ChevronDown16 as Chevron } from "@carbon/icons-vue";
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
function directionsLink(item) {
  let dir_address = "";
  if (item.address.line1) dir_address += item.address.line1;
  if (item.address.line2) dir_address += " " + item.address.line2;
  if (item.address.line3) dir_address += " " + item.address.line3;
  if (item.address.city) dir_address += " " + item.address.city;
  if (item.address.state) dir_address += " " + item.address.state;
  const escapedValue = encodeURIComponent(dir_address).replaceAll("%20", "+");
  return "https://www.google.com/maps/search/?api=1&query=" + escapedValue;
}
function formatHours(hours) {
  return (hours || "").split("\n");
}

const dropOffLocations = computed(() => {
  return voterInfo.info?.dropOffLocations || [];
});
const filteredDropOffLocationsLen = ref(3);
const filteredDropOffLocations = computed(() => {
  return dropOffLocations.value.slice(0, filteredDropOffLocationsLen.value);
});
const hasMoreDropOffLocations = computed(
  () => filteredDropOffLocationsLen.value < dropOffLocations.value.length,
);

function moreDropOff() {
  filteredDropOffLocationsLen.value += 3;
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.location {
  &__directions {
    margin-top: 0.75rem;
  }
}
</style>
