<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";

// These could come from route params or props depending on your routing setup
const state = "GA";
const race = "Governor — Republican Primary 2026";

const { data: candidates, status } = await useAsyncData(
  `candidates-${state}`,
  () =>
    queryCollection("candidates")
      .where("state", "=", state)
      .all(),
);
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-6">
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
    />
  </div>
</template>
