<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";

const route = useRoute();
const electionId = route.params.electionId as string;
const raceId = route.params.raceId as string;
const candidateId = route.params.candidateId as string;

const { elections } = await useElections();
const election = computed(() => elections.value?.find(e => e.id === electionId));

const { data: candidate, status } = await useAsyncData(
  `candidate-${candidateId}-${raceId}`,
  () => {
    let query = queryCollection("candidates")
      .where("fiveFifthsId", "=", candidateId);

    if (raceId !== "r") {
      query = query.where("race_id", "=", raceId);
    }

    return query.first();
  },
  { watch: [() => candidateId, () => raceId] },
);

useSeoMeta({
  title: () => candidate.value?.name ? `five/fifths voter | ${candidate.value.name} — Candidate Scorecard` : "five/fifths voter | Candidate Scorecard",
  ogTitle: () => candidate.value?.name ? `five/fifths voter | ${candidate.value.name} — Candidate Scorecard` : "five/fifths voter | Candidate Scorecard",
  twitterTitle: () => candidate.value?.name ? `five/fifths voter | ${candidate.value.name} — Candidate Scorecard` : "five/fifths voter | Candidate Scorecard",
  description: () => candidate.value?.issues?.callout ?? "Candidate issue scorecard from five/fifths voter",
  twitterDescription: () => candidate.value?.issues?.callout ?? "Candidate issue scorecard from five/fifths voter",
  ogDescription: () => candidate.value?.issues?.callout ?? "Candidate issue scorecard from five/fifths voter",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-6 mt-16">
    <ElectionsBreadcrumbs
      :items="[
      { label: election?.name ?? '', to: `/journey/election/five-fifths-details/${electionId}` },
      { label: candidate?.race ?? '', to: candidate?.race_id ? `/journey/election/${electionId}/candidates/${candidate.race_id}` : undefined },
      { label: candidate?.name ?? '' },
    ]" />
    <div v-if="status === 'pending'" class="flex justify-center py-16">
      <span class="loading loading-spinner loading-lg" />
    </div>

    <div v-else-if="!candidate" role="alert" class="alert alert-error">
      <AlertCircle :size="18" />
      <span>Candidate not found.</span>
    </div>

    <CandidateScorecard v-else :candidate="candidate" />
  </div>
</template>
