<script setup lang="ts">
import { AlertTriangle, CheckCircle, ExternalLink, Info } from "lucide-vue-next";
import type { ContentCandidate } from "~/types/candidate";

const props = defineProps<{
  candidate: ContentCandidate
}>();

const clarityLabel = computed(() => {
  const pct = getAddressedIssuesCount(props.candidate) / getTotalIssuesCount(props.candidate);
  if (pct >= 0.8) return "High";
  if (pct >= 0.5) return "Moderate";
  return "Low";
});
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body py-4 px-5">
        <div class="flex items-start gap-4">
          <CandidateAvatar :initials="candidate.avatar_initials" />

          <!-- Name + meta -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-xl lg:text-2xl font-semibold text-base-content">{{ candidate.name }}</h2>
              <span v-if="candidate.incumbent" class="badge badge-accent badge-sm lg:badge-lg">Incumbent</span>
            </div>
            <p class="text-sm lg:text-lg text-base-content/60 mt-0.5">
              {{ candidate.office_sought }} <span v-if="candidate.primary">·</span> {{ candidate.primary }}
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="badge badge-outline badge-sm lg:badge-lg">{{ candidate.party }}</span>
              <span class="badge badge-outline badge-sm lg:badge-lg">{{ candidate.region }}</span>
              <span v-if="candidate.debate_participant" class="badge badge-success badge-sm lg:badge-lg gap-1">
                <CheckCircle :size="11"/>
                Participated in debate
              </span>
            </div>
          </div>

          <!-- Links -->
          <div v-if="candidate.issues?.links?.length" class="hidden sm:flex flex-col gap-1 shrink-0">
            <ol type="1" class="list-decimal list-inside text-xs">
              <li
                  v-for="link in candidate.issues.links"
                  :key="link.url">
                <a
                    :href="link.url"
                    target="_blank"
                    rel="noreferrer"
                    class="btn btn-ghost btn-xs lg:btn-md gap-1 text-base-content/60 max-w-72"
                >
                  <ExternalLink :size="11" class="shrink-0"/>
                  <span class="truncate">{{ link.label }}</span>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Callout -->
    <div
v-if="candidate.issues?.callout" role="alert"
         class="alert bg-base-200 border-l-4 border-base-content/20 rounded-none text-sm lg:text-lg text-base-content/90">
      <Info  class="size-4 lg:size-6 shrink-0 text-base-content/80"/>
      <span>{{ candidate.issues.callout }}</span>
    </div>

    <!-- Summary stats -->
    <div class="grid grid-cols-3 gap-3">
      <div class="stat bg-base-100 shadow-sm rounded-box p-3">
        <div class="stat-title text-xs lg:text-base">Issues addressed</div>
        <div class="stat-value text-lg">{{ getAddressedIssuesCount(candidate) }} / {{
            getTotalIssuesCount(candidate)
          }}
        </div>
        <div class="stat-desc text-xs">of tracked topics</div>
      </div>
      <div class="stat bg-base-100 shadow-sm rounded-box p-3">
        <div class="stat-title text-xs lg:text-base">Clarity</div>
        <div class="stat-value text-base leading-tight mt-1">{{ clarityLabel }}</div>
      </div>
      <div class="stat bg-base-100 shadow-sm rounded-box p-3">
        <div class="stat-title text-xs lg:text-base">Sources reviewed</div>
        <div class="stat-value text-lg">{{ candidate.issues.sources_count }}</div>
      </div>
    </div>

    <!-- Data note if present -->
    <div v-if="candidate.issues?.data_note" role="alert" class="alert alert-warning alert-sm text-xs py-2">
      <AlertTriangle :size="14" class="shrink-0"/>
      <span>{{ candidate.issues.data_note }}</span>
    </div>

    <!-- Issue sections -->
    <CandidateSectionAccordion
        v-for="section in candidate.sections"
        :key="section.id"
        :section="section"
        :links="candidate.issues.links"
    />

    <CandidateLegend/>

    <!-- Footer -->
    <div class="text-xs text-base-content/40 px-1 space-y-1">
      <div>Last updated: {{ candidate.issues.last_updated }}</div>
    </div>
  </div>
</template>
