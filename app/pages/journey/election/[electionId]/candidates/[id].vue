<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";
import maskGroupUrl from "~/assets/images/mask-group.svg";

const state = "GA";
const route = useRoute();
const electionId = route.params.electionId as string;
const race = route.params.id as string;

const { elections } = await useElections();
const election = computed(() => elections.value?.find(e => e.id === electionId));

const { origin } = useRequestURL();
useSeoMeta({
  title: `five/fifths voter | Candidates — ${race}`,
  ogTitle: `five/fifths voter | Candidates — ${race}`,
  description: () => election.value ? `Candidates running for ${race} in ${election.value.name}` : `Candidates running for ${race}`,
  ogDescription: () => election.value ? `Candidates running for ${race} in ${election.value.name}` : `Candidates running for ${race}`,
  ogImage: `${origin}${maskGroupUrl}`,
  twitterCard: "summary_large_image",
});

const { data: candidates, status } = await useAsyncData(
  `candidates-${race}`,
  () =>
    queryCollection("candidates")
      .where("race", "=", race)
      .order("ballot_order", "ASC")
      .all(),
);
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-6 mt-8">
    <ElectionsBreadcrumbs
:items="[
      { label: election?.name ?? '', to: `/journey/election/five-fifths-details/${electionId}` },
      { label: race },
    ]" />
    <PageTitle>
      Candidates
    </PageTitle>
    <div v-if="status === 'pending'" class="flex justify-center py-16">
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
