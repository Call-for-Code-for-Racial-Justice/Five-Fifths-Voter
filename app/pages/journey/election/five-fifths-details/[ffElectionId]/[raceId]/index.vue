<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";

const route = useRoute();
const ffElectionId = computed(() => route.params.ffElectionId as string);
const raceId = computed(() => route.params.raceId as string);

const { election, electionStatus } = await useElectionByFfId(ffElectionId);

const races = computed(() => election.value?.races || []);
const race = computed(() => races.value?.find((r: { id: string }) => r.id === raceId.value));
const state = computed(() => election.value?.region_code);

useSeoMeta({
  title: () => `five/fifths voter | Candidates — ${raceId.value}`,
  ogTitle: () => `five/fifths voter | Candidates — ${raceId.value}`,
  description: () => election.value ? `Candidates running for ${raceId.value} in ${election.value.description}` : `Candidates running for ${raceId.value}`,
  ogDescription: () => election.value ? `Candidates running for ${raceId.value} in ${election.value.description}` : `Candidates running for ${raceId.value}`,
  twitterDescription: () => election.value ? `Candidates running for ${raceId.value} in ${election.value.description}` : `Candidates running for ${raceId.value}`,
  twitterCard: "summary_large_image",
});

const { data: candidates, status } = await useAsyncData(
  () => `candidates-${raceId.value}`,
  () =>
    queryCollection("candidates")
      .where("race_id", "=", raceId.value)
      .order("ballot_order", "ASC")
      .all(),
  { watch: [raceId] },
);
</script>

<template>
  <div class="max-w-3xl lg:max-w-5xl mx-auto px-4 py-6 mt-8">
    <ElectionsBreadcrumbs
:items="[
      { label: election?.description ?? '', to: `/journey/election/five-fifths-details/${ffElectionId}` },
      { label: race?.name ?? raceId },
    ]" />
    <PageTitle>
      Candidates
    </PageTitle>
    <div v-if="status === 'pending' || electionStatus === 'pending'" class="flex justify-center py-16">
      <span class="loading loading-spinner loading-lg" />
    </div>

    <div v-else-if="!candidates?.length" role="alert" class="alert alert-warning">
      <AlertTriangle :size="18" />
      <span>No candidates found for this state and race.</span>
    </div>

    <CandidateList
      v-else
      :candidates="candidates"
      :state="state"
      :race="race"
      :election-id="ffElectionId"
    />

  </div>
</template>
