<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";

const route = useRoute();

// fiveFifthsId comes from the route param, e.g. /candidates/candidate-brt-jones
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
      content: candidate.value?.meta?.callout ?? "Candidate issue scorecard",
    },
  ],
});
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-6">
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
