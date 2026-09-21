<script setup lang="ts">
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";
import type { ContentElection } from "~/types/election";

defineProps<{
  election: ContentElection
}>();
</script>

<template>
  <div class="card bg-base-200 shadow-sm">
    <div class="card-body">
      <h2 class="card-title">Election Details</h2>
      <JourneyInfoField label="Election Day" :prefix="`${niceIsoDate(election.date)} ⟶`" :value="daysLeftIso(election.date)" />
      <JourneyInfoField v-if="election?.voting?.early.startDate" label="Early Voting" :prefix="`${niceIsoDate(election?.voting?.early.startDate)} ⟶`" :value="daysLeftIso(election?.voting?.early.startDate)" />

      <div class="mt-4">
        <a :href="election.website" target="_blank" class="btn btn-outline btn-primary btn-block">
          Official Website
        </a>
      </div>
    </div>
  </div>
</template>
