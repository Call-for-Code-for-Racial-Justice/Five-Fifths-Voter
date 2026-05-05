<script setup lang="ts">
import { CheckCircle } from "lucide-vue-next";

interface CandidateSummary {
  fiveFifthsId: string
  name: string
  state: string
  race: string
  party: string
  incumbent: boolean
  debate_participant: boolean
  avatar_initials: string
  meta: {
    issues_addressed: number
    issues_total: number
  }
  sections: Array<{
    id: string
    items: Array<{
      position_type: "pos" | "mixed" | "none"
      position_tag: string | null
      topic: string
    }>
  }>
}

const props = defineProps<{
  candidates: CandidateSummary[]
  state?: string
  race?: string
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
        <h2 class="text-lg font-semibold text-base-content">{{ race }}</h2>
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
    <div class="grid gap-3 sm:grid-cols-2">
      <NuxtLink
        v-for="c in filtered"
        :key="c.fiveFifthsId"
        :to="`/candidates/${c.fiveFifthsId}`"
        class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="card-body py-3 px-4">
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <div class="avatar placeholder shrink-0">
              <div class="bg-neutral text-neutral-content rounded-full w-10">
                <span class="text-xs font-medium">{{ c.avatar_initials }}</span>
              </div>
            </div>

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
                {{ c.meta.issues_addressed }}/{{ c.meta.issues_total }}
              </div>
              <div class="text-xs text-base-content/40">topics</div>
            </div>
          </div>

          <!-- Mini position tag preview -->
          <div class="flex flex-wrap gap-1 mt-2">
            <template v-for="section in c.sections" :key="section.id">
              <template v-for="item in section.items.filter(i => i.position_type === 'pos').slice(0, 2)" :key="item.topic">
                <span class="badge badge-xs badge-success">{{ item.position_tag }}</span>
              </template>
            </template>
            <span class="badge badge-xs badge-ghost">View scorecard →</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
