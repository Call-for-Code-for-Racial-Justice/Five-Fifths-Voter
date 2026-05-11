<script setup lang="ts">
import { CheckCircle, ExternalLink, Info, AlertTriangle } from "lucide-vue-next";

interface CandidateLink {
  label: string
  url: string
}

interface CandidateMeta {
  issues_addressed: number
  issues_total: number
  clarity: string
  sources_count: number
  sources_list: string[]
  last_updated: string
  callout?: string
  data_note?: string
  links?: CandidateLink[]
}

interface SectionItem {
  topic: string
  note?: string
  coverage: number // 0–3
  position_tag: string | null
  position_type: "pos" | "mixed" | "none"
  source: "debate" | "website" | "both" | null
}

interface Section {
  id: string
  title: string
  items: SectionItem[]
}

interface Candidate {
  fiveFifthsId: string
  name: string
  state: string
  race: string
  party: string
  primary: string
  office_sought: string
  district: string | null
  region: string
  incumbent: boolean
  debate_participant: boolean
  avatar_initials: string
  issues: CandidateMeta
  sections: Section[]
}

const props = defineProps<{
  candidate: Candidate
}>();

const clarityLabel = computed(() => {
  const pct = props.candidate.issues.issues_addressed / props.candidate.issues.issues_total;
  if (pct >= 0.8) return "High";
  if (pct >= 0.5) return "Moderate";
  return "Low";
});

const sourcesSummary = computed(() =>
  props.candidate.issues.sources_list
    .map(s => s.split(" ")[0].replace(/[()]/g, ""))
    .join(" · "),
);
</script>

<template>
  <div class="space-y-4 mt-16">
    <!-- Header -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body py-4 px-5">
        <div class="flex items-start gap-4">
          <!-- Avatar -->
          <div class="avatar avatar-placeholder">
            <div class="bg-neutral text-neutral-content w-10 rounded-full">
              <span class="text-xs font-medium">{{ candidate.avatar_initials }}</span>
            </div>
          </div>

          <!-- Name + meta -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-xl font-semibold text-base-content">{{ candidate.name }}</h2>
              <span v-if="candidate.incumbent" class="badge badge-accent badge-sm">Incumbent</span>
            </div>
            <p class="text-sm text-base-content/60 mt-0.5">
              {{ candidate.office_sought }} · {{ candidate.primary }}
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="badge badge-outline badge-sm">{{ candidate.party }}</span>
              <span class="badge badge-outline badge-sm">{{ candidate.region }}</span>
              <span v-if="candidate.debate_participant" class="badge badge-success badge-sm gap-1">
                <CheckCircle :size="11" />
                Participated in debate
              </span>
            </div>
          </div>

          <!-- Links -->
          <div v-if="candidate.issues?.links?.length" class="hidden sm:flex flex-col gap-1 shrink-0">
            <a
              v-for="link in candidate.issues.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noreferrer"
              class="btn btn-ghost btn-xs gap-1 text-base-content/60"
            >
              <ExternalLink :size="11" />
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Callout -->
    <div v-if="candidate.issues?.callout" role="alert" class="alert bg-base-200 border-l-4 border-base-content/20 rounded-none text-sm text-base-content/70">
      <Info :size="16" class="shrink-0 text-base-content/40" />
      <span>{{ candidate.issues.callout }}</span>
    </div>

    <!-- Summary stats -->
    <div class="grid grid-cols-3 gap-3">
      <div class="stat bg-base-100 shadow-sm rounded-box p-3">
        <div class="stat-title text-xs">Issues addressed</div>
        <div class="stat-value text-lg">{{ candidate.issues.issues_addressed }} / {{ candidate.issues.issues_total }}</div>
        <div class="stat-desc text-xs">of tracked topics</div>
      </div>
      <div class="stat bg-base-100 shadow-sm rounded-box p-3">
        <div class="stat-title text-xs">Clarity</div>
        <div class="stat-value text-base leading-tight mt-1">{{ clarityLabel }}</div>
        <div class="stat-desc text-xs truncate">{{ candidate.issues.clarity }}</div>
      </div>
      <div class="stat bg-base-100 shadow-sm rounded-box p-3">
        <div class="stat-title text-xs">Sources reviewed</div>
        <div class="stat-value text-lg">{{ candidate.issues.sources_count }}</div>
        <div class="stat-desc text-xs">{{ sourcesSummary }}</div>
      </div>
    </div>

    <!-- Data note if present -->
    <div v-if="candidate.issues?.data_note" role="alert" class="alert alert-warning alert-sm text-xs py-2">
      <AlertTriangle :size="14" class="shrink-0" />
      <span>{{ candidate.issues.data_note }}</span>
    </div>

    <!-- Issue sections -->
    <CandidateSectionAccordion
      v-for="section in candidate.sections"
      :key="section.id"
      :section="section"
    />

    <!-- Legend -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body py-3 px-4">
        <CandidateLegend />
      </div>
    </div>

    <!-- Footer -->
    <div class="text-xs text-base-content/40 px-1 space-y-1">
      <div v-for="src in candidate.issues.sources_list" :key="src">{{ src }}</div>
      <div>Last updated: {{ candidate.issues.last_updated }}</div>
    </div>
  </div>
</template>
