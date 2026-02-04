<script setup lang="ts">
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";

definePageMeta({
  subnavigation: "journey",
});

const route = useRoute();
const id = route.params.id as string;
const { elections, status } = await useElections();

const election = computed(() => {
  return elections.value?.find(e => e.source === "api" && e.id === id);
});
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto mt-14">
    <div v-if="status === 'pending'" class="flex justify-center p-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="election" class="space-y-8 animate-in fade-in duration-500">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div>
          <h1 class="text-3xl font-bold text-primary">{{ election.name }}</h1>
        </div>
        <div class="badge badge-primary badge-lg p-4">
          {{ niceIsoDate(election.date) }}
        </div>
      </div>

      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-secondary">Election Details</h2>
          <div class="space-y-4">
            <JourneyInfoField label="Date" :value="`${niceIsoDate(election.date)} ⟶ ${daysLeftIso(election.date)}`" />
            <JourneyInfoField label="OCD Division ID" :value="election.ocdId" />
          </div>

          <div class="alert alert-info mt-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>This election data is provided by the Google Civic Information API. For more detailed local information, please check your local election official's website.</span>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <NuxtLink to="/journey/getInformed" class="btn btn-ghost">
          ← Back to Dashboard
        </NuxtLink>
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
