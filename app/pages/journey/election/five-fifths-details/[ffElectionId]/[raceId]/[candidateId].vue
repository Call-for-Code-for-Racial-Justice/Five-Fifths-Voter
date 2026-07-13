<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";

const route = useRoute();
const ffElectionId = computed(() => route.params.ffElectionId as string);
const raceId = computed(() => route.params.raceId as string);
const candidateId = computed(() => route.params.candidateId as string);

const { election, electionStatus } = await useElectionByFfId(ffElectionId);

const { data: candidate, status } = await useAsyncData(
  () => `candidate-${candidateId.value}-${raceId.value}`,
  () => {
    let query = queryCollection("candidates")
      .where("fiveFifthsId", "=", candidateId.value);

    if (raceId.value !== "r") {
      query = query.where("race_id", "=", raceId.value);
    }

    return query.first();
  },
  { watch: [candidateId, raceId] },
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
  <div class="max-w-2xl lg:max-w-5xl mx-auto px-4 py-6 mt-16">
    <ElectionsBreadcrumbs
      :items="[
      { label: election?.description ?? '', to: `/journey/election/five-fifths-details/${ffElectionId}` },
      { label: candidate?.race ?? '', to: candidate?.race_id ? `/journey/election/five-fifths-details/${ffElectionId}/${candidate.race_id}` : undefined },
      { label: candidate?.name ?? '' },
    ]" />
    <div v-if="status === 'pending' || electionStatus === 'pending'" class="flex justify-center py-16">
      <span class="loading loading-spinner loading-lg" />
    </div>

    <div v-else-if="!candidate" role="alert" class="alert alert-error">
      <AlertCircle :size="18" />
      <span>Candidate not found.</span>
    </div>

    <CandidateScorecard v-else :candidate="candidate" />
  </div>
</template>
