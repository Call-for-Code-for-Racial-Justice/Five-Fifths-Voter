<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";

const route = useRoute();
const electionId = route.params.electionId as string;

const { elections } = await useElections();
const election = computed(() => elections.value?.find(e => e.id === electionId));

const candidateId = computed(() => route.params.id as string);

const { data: candidate, status } = await useAsyncData(
  `candidate-${candidateId.value}`,
  () =>
    queryCollection("candidates")
      .where("fiveFifthsId", "=", candidateId.value)
      .first(),
  { watch: [candidateId] },
);

// SEO
useHead({
  title: candidate.value?.name ? `${candidate.value.name} — Candidate Scorecard` : "Candidate Scorecard",
  meta: [
    {
      name: "description",
      content: candidate.value?.issues?.callout ?? "Candidate issue scorecard",
    },
  ],
});
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-6 mt-16">
    <ElectionsBreadcrumbs
      :items="[
      { label: election?.name ?? '', to: `/journey/election/five-fifths-details/${electionId}` },
      { label: candidate?.race ?? '', to: candidate?.race ? `/journey/election/${electionId}/candidates/${candidate.race}` : undefined },
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
