<script setup>
import electionInfo from "@/assets/data/usa-2024.json";

const { t } = useI18n();
const user = useUser();
const usaCode = computed(() => user.value.info?.location?.region_code);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const registered = computed(() =>
  Boolean(user.value.info?.registered === "presidential-2024"),
);
const info = computed(() => {
  const code = usaCode.value?.toLowerCase() || "unknown";
  return electionInfo[code] || { register: { territory: true } };
});
const returnDeadline = computed(() => {
  const dateStr = info.value?.mail_in?.return_deadline;
  if (!dateStr) return "";
  return t("absenteeReturn", {
    date: niceDate(dateStr),
    days: daysLeft(dateStr),
  });
});
const hasDropoff = computed(() => {
  const faq = info.value?.mail_in || {};
  return "dropoff" in faq;
});
const dropoffExplainer = computed(() => {
  const explainer = info.value?.mail_in?.dropoff_explainer;
  if (!explainer) return "";

  return `\u21b3 ${info.value.mail_in.dropoff_explainer}`;
});
const trackingLink = computed(() => {
  const url = info.value?.mail_in?.track_link;
  if (!url) return "";
  return t("absenteeTrack", { trackUrl: url });
});
const moreAbsenteeInfoLink = computed(() => {
  const url = info.value?.mail_in?.more_link;
  if (!url) return "";
  return t("absenteeMoreInfo", { moreUrl: url });
});
</script>

<template>
  <PageTitle>
    {{ $t("ballotTitle") }}
  </PageTitle>
  <cv-grid :full-width="true">
    <cv-row>
      <cv-column
          :sm="4"
          :lg="8"
      >
        <!-- Return deadline -->
        <div
            v-if="returnDeadline"
            class="mb-4 text-base"
        >
          <MarkDown :content="returnDeadline"/>
        </div>

        <!-- drop-off -->
        <JourneyFAQ
            v-if="hasDropoff"
            :question="t('absenteeDropFaq')"
            :answer="!!info?.mail_in?.dropoff">
          <MarkDown
              v-if="dropoffExplainer"
              style="display: inline-block"
              :content="dropoffExplainer"
          />
        </JourneyFAQ>

        <!-- State link -->
        <div
            v-if="trackingLink"
            class="mb-4 text-base"
        >
          <MarkDown :content="trackingLink"/>
        </div>

        <!-- more information link -->
        <div
            v-if="moreAbsenteeInfoLink"
            class="mb-4 text-base"
        >
          <MarkDown :content="moreAbsenteeInfoLink"/>
        </div>
      </cv-column>

      <!-- side image -->
      <cv-column
          :sm="4"
          :lg="8"
      >
        <div class="aspect-[4/3] w-full max-w-xl">
          <img
              class="size-full object-cover object-[0_39%]"
              src="@/assets/images/ballot-return-image-1.jpg"
              alt=""
          >
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>
