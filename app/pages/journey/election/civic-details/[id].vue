<script setup lang="ts">
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";
import { MoveLeftIcon } from "lucide-vue-next";

definePageMeta({
  subnavigation: "journey",
});

const route = useRoute();
const id = route.params.id as string;
const { elections, status } = await useElections();
const { stateNameOf } = useStateName();
const config = useRuntimeConfig();

const election = computed(() => {
  return elections.value?.find(e => e.source === "api" && e.id === id);
});
const stateLink = computed(() => {
  if (election.value?.ocdId?.startsWith("ocd-division/country:us/state:")) {
    const stateAbbr = election.value.ocdId.slice(-2);
    return `https://www.vote411.org/${stateNameOf(stateAbbr).value}/`;
  }
  return null;
});
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto mt-14">
    <div v-if="status === 'pending'" class="flex justify-center p-12">
      <span class="loading loading-spinner loading-lg text-primary"/>
    </div>

    <div v-else-if="election" class="animate-in fade-in duration-500">
      <div>
        <NuxtLink to="/journey/getInformed" class="btn btn-ghost text-xs">
          <MoveLeftIcon/> Back to Dashboard
        </NuxtLink>
      </div>
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div>
          <h1 class="text-3xl font-bold text-primary">{{ election.name }}</h1>
        </div>
      </div>

      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-secondary">Election Details</h2>
          <div class="space-y-4">
            <JourneyInfoField label="Date" :prefix="`${niceIsoDate(election.date)} ⟶`" :value="daysLeftIso(election.date)" />
          </div>
          <div v-if="stateLink" class="">
            <a class="btn btn-primary" :href="stateLink" target="_blank">View Election information</a>
          </div>
          <div v-else>
            <a
              class="btn btn-primary" href="https://ballotpedia.org/Elections_calendar#Upcoming_election_dates"
              target="_blank">View Election Calendar</a>
          </div>
          <div v-if="config.public.civicDebug">
            <pre>
              {{ JSON.stringify(election, null, 2) }}
            </pre>
          </div>

          <div class="alert alert-info mt-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>This election data is provided by the Google Civic Information API. For more detailed local information, please check your local election official's website.</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold">Election not found</h2>
      <NuxtLink to="/journey/getInformed" class="btn btn-primary mt-4">
        Back to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>
