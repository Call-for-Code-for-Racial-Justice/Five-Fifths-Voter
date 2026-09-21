<script setup lang="ts">
import { Info } from "lucide-vue-next";
import type { ContentElection } from "~/types/election";

const { t } = useI18n();

const props = defineProps<{
  election: ContentElection
}>();

const voting = computed(() => props.election?.voting);

function yesNoMaybe(val: string | boolean | undefined) {
  if (val === true) return t("yes");
  if (val === false) return t("no");
  return t("maybe");
}
</script>

<template>
  <div class="card bg-base-200 shadow-sm md:col-span-2">
    <div class="card-body">
      <h2 class="card-title">In-Person Voting</h2>
      <div class="space-y-3">
        <JourneyInfoField
          label="ID Required for All Voters"
          :value="yesNoMaybe(voting?.inPerson.idRequiredAllVoters)"/>
        <div v-if="voting?.inPerson.idInstructions">
          <span class="text-sm font-bold opacity-70 uppercase">ID Instructions</span>
          <p class="text-sm mt-1">{{ voting?.inPerson.idInstructions }}</p>
        </div>
        <a v-if="election?.voting?.idUrl" :href="election?.voting?.idUrl" target="_blank" class="btn btn-md btn-link p-0 h-auto">
          More information about IDs
          <Info title="More information"/>
        </a>
        <div class="bg-base-300 p-3 rounded-lg mt-2">
          <span class="text-xs font-bold opacity-70 uppercase block mb-1">Election Day Hours</span>
          <span class="text-sm">
            {{ voting?.inPerson.electionDay.opening || 'N/A' }} - {{ voting?.inPerson.electionDay.closing || 'N/A' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
