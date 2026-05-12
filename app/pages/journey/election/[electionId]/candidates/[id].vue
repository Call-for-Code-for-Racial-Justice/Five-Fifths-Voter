<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";

const state = "GA";
const route = useRoute();
const electionId = route.params.electionId as string;
const race = route.params.id as string;

const { elections } = await useElections();
const election = computed(() => elections.value?.find(e => e.id === electionId));

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
    <ElectionsBreadcrumbs :items="[
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
