<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";

const state = "GA";
const route = useRoute();
const electionId = route.params.electionId as string;
const raceId = route.params.id as string;

const { data: election, status: electionStatus } = await useAsyncData(
  `election-${electionId}`,
  () =>
    queryCollection("elections")
      .where("fiveFifthsId", "=", electionId)
      .first(),
);

const races = computed(() => election.value?.races || []);
const race = computed(() => races.value?.find((r: { id: string }) => r.id === raceId));

useSeoMeta({
  title: `five/fifths voter | Candidates — ${raceId}`,
  ogTitle: `five/fifths voter | Candidates — ${raceId}`,
  description: () => election.value ? `Candidates running for ${raceId} in ${election.value.description}` : `Candidates running for ${raceId}`,
  ogDescription: () => election.value ? `Candidates running for ${raceId} in ${election.value.description}` : `Candidates running for ${raceId}`,
  twitterDescription: () => election.value ? `Candidates running for ${raceId} in ${election.value.description}` : `Candidates running for ${raceId}`,
  twitterCard: "summary_large_image",
});

const { data: candidates, status } = await useAsyncData(
  `candidates-${raceId}`,
  () =>
    queryCollection("candidates")
      .where("race_id", "=", raceId)
      .order("ballot_order", "ASC")
      .all(),
);
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-6 mt-8">
    <ElectionsBreadcrumbs
:items="[
      { label: election?.description ?? '', to: `/journey/election/five-fifths-details/${electionId}` },
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
      :election-id="electionId"
    />
  </div>
</template>
