<script setup lang="ts">
import { CheckCircle } from "lucide-vue-next";
import type { ContentCandidate } from "~/types/candidate";
import type { ContentElectionRace } from "~/types/election";

const props = defineProps<{
  candidates: ContentCandidate[]
  state?: string
  race: ContentElectionRace
  electionId?: string
}>();

const activeParty = ref<string | null>(null);

const parties = computed(() => [...new Set(props.candidates.map(c => c.party))]);
const hasMultipleParties = computed(() => parties.value.length > 1);

const filtered = computed(() =>
  activeParty.value ? props.candidates.filter(c => c.party === activeParty.value) : props.candidates,
);
</script>

<template>
  <div class="space-y-3">
    <!-- Race header -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h2 class="text-lg font-semibold text-base-content">{{ race?.name }}</h2>
        <p class="text-sm text-base-content/50">{{ candidates.length }} candidates · {{ state }}</p>
      </div>
      <!-- Filter by party if mixed -->
      <div v-if="hasMultipleParties" class="join">
        <button
          v-for="p in parties"
          :key="p"
          class="btn btn-sm join-item"
          :class="activeParty === p ? 'btn-active' : 'btn-ghost'"
          @click="activeParty = activeParty === p ? null : p"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Candidate cards -->
    <div class="grid gap-3 sm:grid-cols-1">
      <NuxtLink
        v-for="c in filtered"
        :key="c.fiveFifthsId"
        :to="`/journey/election/${electionId}/candidates/${race.id}/score/${c.fiveFifthsId}`"
        class="card bg-base-100 shadow-sm dark:border dark:border-accent hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="card-body py-3 px-4">
          <div class="flex items-center gap-3">
            <CandidateAvatar :initials="c.avatar_initials" />

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-medium text-sm text-base-content">{{ c.name }}</span>
                <span v-if="c.incumbent" class="badge badge-accent badge-xs">Incumbent</span>
              </div>
              <div class="flex items-center gap-2 mt-1 flex-wrap">
                <span class="badge badge-outline badge-xs">{{ c.party }}</span>
                <span v-if="c.debate_participant" class="text-xs text-success flex items-center gap-0.5">
                  <CheckCircle :size="11" />
                  Debated
                </span>
              </div>
            </div>

            <!-- Coverage summary -->
            <div class="text-right shrink-0">
              <div class="text-base font-semibold text-base-content">
                {{ getAddressedIssuesCount(c) }}/{{ getTotalIssuesCount(c) }}
              </div>
              <div class="text-xs text-base-content/40">topics</div>
            </div>
          </div>

          <!-- Mini position tag preview -->
          <CandidatePositionTagsPreview :candidate="c" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
