<script setup lang="ts">
import type { ContentElection } from "~/types/election";

const { t } = useI18n();

defineProps<{
  election: ContentElection
}>();

function yesNoMaybe(val: string | boolean | undefined) {
  if (val === true) return t("yes");
  if (val === false) return t("no");
  return t("maybe");
}
</script>

<template>
  <div class="card bg-base-200 shadow-sm">
    <div class="card-body">
      <h2 class="card-title">Voting Options</h2>
      <div class="space-y-2">
        <JourneyInfoField
            label="Early Voting Available"
            :value="yesNoMaybe(election?.voting?.early.startDate ? true : undefined)" />
        <JourneyInfoField
          label="In-Person Voting Available"
          :value="yesNoMaybe(election?.voting?.inPersonVotingAvailable)" />
        <JourneyInfoField
          label="Mail Ballots Sent Automatically"
          :value="yesNoMaybe(election?.voting?.mailBallotsSentAutomatically)" />
      </div>
    </div>
  </div>
</template>
