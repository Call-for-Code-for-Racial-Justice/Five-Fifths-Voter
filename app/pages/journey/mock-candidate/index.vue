<script setup>
import { ref } from "vue";
import CandidateCard from "./CandidateCard.vue";

// Liberal-leaning concerns (directional intent)
// NOTE: These are example scores derived from the earlier discussion.
// Replace the rationale + sources with your evidence pack links.

const brownItems = ref([
  {
    key: "affordable_housing",
    label: "Affordable housing & tenant protection",
    score: 2,
    rationale:
        "General affordability/cost-of-living emphasis; no detailed tenant policy found in provided sources.",
    sources: [
      { label: "Campaign site", href: "https://www.lemarioforgeorgia.com/" },
      {
        label: "Local news",
        href:
            "https://www.13wmaz.com/article/news/local/macon/brown-and-mcneel-make-last-push-in-senate-district-18-runoff/93-bd745194-628d-4a8c-af4a-81ea3e630adb",
      },
    ],
  },
  {
    key: "healthcare_access",
    label: "Healthcare access",
    score: 3,
    rationale: "Explicitly emphasizes expanding healthcare access in campaign priorities.",
    sources: [{ label: "Campaign site", href: "https://www.lemarioforgeorgia.com/" }],
  },
  {
    key: "climate_environment",
    label: "Climate & environmental protection",
    score: 1,
    rationale:
        "No clear climate platform located in provided sources; may touch related infrastructure themes only.",
    sources: [{ label: "Campaign site", href: "https://www.lemarioforgeorgia.com/" }],
  },
  {
    key: "criminal_justice_reform",
    label: "Criminal justice reform",
    score: 1,
    rationale:
        "Public safety mentioned, but reform-oriented specifics not found in provided sources.",
    sources: [
      { label: "Campaign site", href: "https://www.lemarioforgeorgia.com/" },
      {
        label: "Local news",
        href:
            "https://www.13wmaz.com/article/news/local/macon/brown-and-mcneel-make-last-push-in-senate-district-18-runoff/93-bd745194-628d-4a8c-af4a-81ea3e630adb",
      },
    ],
  },
  {
    key: "reproductive_rights",
    label: "Reproductive rights (pro-choice access)",
    score: 1,
    rationale:
        "No explicit pro-choice position found in the provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.lemarioforgeorgia.com/" }],
  },
  {
    key: "lgbtq_protections",
    label: "LGBTQ protections",
    score: 0,
    rationale: "No clear evidence found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.lemarioforgeorgia.com/" }],
  },
  {
    key: "voting_rights",
    label: "Voting rights & access",
    score: 0,
    rationale: "No clear evidence found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.lemarioforgeorgia.com/" }],
  },
  {
    key: "education_funding",
    label: "Education funding",
    score: 2,
    rationale:
        "Education/community investment themes present; funding specifics not found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.lemarioforgeorgia.com/" }],
  },
]);

const mcneelItems = ref([
  {
    key: "affordable_housing",
    label: "Affordable housing & tenant protection",
    score: 0,
    rationale: "No clear evidence found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.votestevenmcneel.com/" }],
  },
  {
    key: "healthcare_access",
    label: "Healthcare access",
    score: 0,
    rationale: "No clear evidence found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.votestevenmcneel.com/" }],
  },
  {
    key: "climate_environment",
    label: "Climate & environmental protection",
    score: 0,
    rationale: "No clear evidence found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.votestevenmcneel.com/" }],
  },
  {
    key: "criminal_justice_reform",
    label: "Criminal justice reform",
    score: 0,
    rationale:
        "Emphasizes law enforcement funding; reform-oriented policies not found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.votestevenmcneel.com/" }],
  },
  {
    key: "reproductive_rights",
    label: "Reproductive rights (pro-choice access)",
    score: 0,
    tag: "Conflicts with concern",
    rationale:
        "Candidate states a pro-life position; this is directionally opposite to a pro-choice reproductive-rights concern.",
    sources: [{ label: "Campaign site", href: "https://www.votestevenmcneel.com/" }],
  },
  {
    key: "lgbtq_protections",
    label: "LGBTQ protections",
    score: 1,
    rationale:
        "No explicit protections platform found in provided sources; avoid inferring beyond available text.",
    sources: [{ label: "Campaign site", href: "https://www.votestevenmcneel.com/" }],
  },
  {
    key: "voting_rights",
    label: "Voting rights & access",
    score: 0,
    rationale: "No clear evidence found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.votestevenmcneel.com/" }],
  },
  {
    key: "education_funding",
    label: "Education funding",
    score: 2,
    rationale:
        "Emphasizes school choice; funding expansion specifics not found in provided sources.",
    sources: [{ label: "Campaign site", href: "https://www.votestevenmcneel.com/" }],
  },
]);
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 mt-16">
    <div class="mx-auto max-w-5xl space-y-6">
      <header class="space-y-2">
        <h1 class="text-2xl font-semibold text-slate-900">Candidate Alignment Mock UI</h1>
        <p class="text-slate-600">
          Sample Liberal-leaning voter profile • Teal intensity shows strength of alignment (0–3) based on available evidence.
          <span class="font-medium">Not an endorsement.</span>
        </p>
      </header>

      <!-- Legend -->
      <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex flex-wrap items-center gap-4">
          <div class="text-sm font-medium text-slate-700">Legend</div>
          <div class="flex items-center gap-2">
            <span class="h-3 w-10 rounded-full bg-slate-100 ring-1 ring-slate-200" />
            <span class="text-xs text-slate-600">0 No clear evidence found</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="h-3 w-10 rounded-full bg-teal-100" />
            <span class="text-xs text-slate-600">1 Weak / indirect</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="h-3 w-10 rounded-full bg-teal-300" />
            <span class="text-xs text-slate-600">2 General / partial</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="h-3 w-10 rounded-full bg-teal-600" />
            <span class="text-xs text-slate-600">3 Strong explicit</span>
          </div>
          <div class="ml-auto text-xs text-slate-500">
            Tip: Click any row to show the rationale and sources.
          </div>
        </div>
      </section>

      <div class="grid gap-6 md:grid-cols-2">
        <CandidateCard
            candidate-name="LeMario Brown"
            subtitle="Based on campaign website + local news link provided"
            :items="brownItems"
        />

        <CandidateCard
            candidate-name="Steven McNeel"
            subtitle="Based on campaign website + local news link provided"
            :items="mcneelItems"
        />
      </div>

      <footer class="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
        <div class="space-y-2">
          <div class="font-medium text-slate-700">Notes for reviewers</div>
          <ul class="list-disc space-y-1 pl-5">
            <li>Scores reflect alignment with the selected concern definition (direction matters).</li>
            <li>If a candidate states an opposite-direction position, score should be 0 and flagged as “conflicts with concern.”</li>
            <li>“No clear evidence found” should not be treated as opposition, just unknown.</li>
          </ul>
        </div>
      </footer>
    </div>
  </div>
</template>
