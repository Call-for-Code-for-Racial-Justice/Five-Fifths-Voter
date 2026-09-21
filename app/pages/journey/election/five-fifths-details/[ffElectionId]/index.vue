<script setup lang="ts">
definePageMeta({
  subnavigation: "journey",
});

const route = useRoute();
const id = route.params.ffElectionId as string;

const { election, electionStatus } = await useElectionByFfId(id);
const races = computed(() => election?.value?.races ?? []);

useSeoMeta({
  title: () => election.value ? `five/fifths voter | ${election?.value?.description}` : "five/fifths voter",
  ogTitle: () => election.value ? `five/fifths voter | ${election?.value?.description}` : "five/fifths voter",
  twitterTitle: () => election.value ? `five/fifths voter | ${election?.value?.description}` : "five/fifths voter",
  description: () => election.value ? `Voting dates, candidates, and registration information for ${election?.value?.description}` : "Election information from five/fifths voter",
  ogDescription: () => election.value ? `Voting dates, candidates, and registration information for ${election?.value?.description}` : "Election information from five/fifths voter",
  twitterDescription: () => election.value ? `Voting dates, candidates, and registration information for ${election?.value?.description}` : "Election information from five/fifths voter",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto mt-14">
    <div v-if="electionStatus === 'pending'" class="flex justify-center p-12">
      <span class="loading loading-spinner loading-lg text-primary"/>
    </div>

    <div v-else-if="election" class="animate-in fade-in duration-500">
      <ElectionsBreadcrumbs :items="[{ label: election.description }]" />
      <div class="border-b border-base-300 pb-4">
        <div>
          <h1 class="text-3xl font-bold text-primary">{{ election.description }}</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JourneyElectionDetailsCard :election="election" />
        <JourneyElectionVotingOptionsCard :election="election" />
        <JourneyElectionRacesCard :races="races" :election-description="election.description" :election-id="id" />
        <JourneyElectionEarlyVotingCard :election="election" />
        <JourneyElectionVotingByMailCard :election="election" />
        <JourneyElectionInPersonVotingCard :election="election" />
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
