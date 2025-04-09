<script setup>
import electionInfo from "@/assets/data/usa-2024.json";
import {
  isUserRequestedBallot,
  setUserRequestedBallot,
} from "~/composables/user";

const { t } = useI18n();
const user = useUser();
const usaCode = computed(() => user.value.info?.location?.region_code);
const requested = computed(() => isUserRequestedBallot());
const info = computed(() => {
  const code = usaCode.value?.toLowerCase() || "unknown";
  return electionInfo[code] || { register: { territory: true } };
});

const requestLink = computed(() => {
  const requestUrl = info.value?.mail_in?.request_link || "https://www.vote.org/absentee-ballot/";
  return t("absenteeRequest", { url: requestUrl });
});
const moreLink = computed(() => {
  const moreUrl = info.value?.mail_in?.more_link;
  if (!moreUrl) return "";

  return t("absenteeMoreInfo", { moreUrl: moreUrl });
});
const requestDeadline = computed(() => {
  const dateStr = info.value?.mail_in?.request_deadline;
  if (!dateStr) return "";
  return t("absenteeRequestDeadline", {
    date: niceDate(dateStr),
    days: daysLeft(dateStr),
  });
});
const returnDeadline = computed(() => {
  const dateStr = info.value?.mail_in?.return_deadline;
  if (!dateStr) return "";
  return t("absenteeReturn", {
    date: niceDate(dateStr),
    days: daysLeft(dateStr),
  });
});
const hasFaq = computed(() => {
  const faq = info.value?.mail_in || {};
  return (
    "id_needed" in faq || "online" in faq || "dropoff" in faq || "any_reason" in faq || "without_notary" in faq
  );
});

const idNeeded = computed(() => {
  const faq = info.value?.mail_in || {};
  return "id_needed" in faq;
});

const idExplainer = computed(() => {
  const explainer = info.value?.mail_in?.id_explainer;
  const idLink = info.value?.mail_in?.id_link || "https://www.ncsl.org/elections-and-campaigns/voter-id";
  if (!explainer) return "";

  return `\u21b3 ${explainer}[${t("absenteeMoreId")}](${idLink})`;
});

const dropoffExplainer = computed(() => {
  const explainer = info.value?.mail_in?.dropoff_explainer;
  if (!explainer) return "";

  return `\u21b3 ${info.value.mail_in.dropoff_explainer}`;
});

const hasDropoff = computed(() => {
  const faq = info.value?.mail_in || {};
  return "dropoff" in faq;
});

const hasAnyReason = computed(() => {
  const faq = info.value?.mail_in || {};
  return "any_reason" in faq;
});
const hasNotary = computed(() => {
  const faq = info.value?.mail_in || {};
  return "without_notary" in faq;
});

const onRequested = val => setUserRequestedBallot(val);
</script>

<template>
  <page-title>
    {{ $t("absenteeTitle") }}
  </page-title>
  <cv-grid :full-width="true">
    <cv-row>
      <cv-column
          :sm="4"
          :lg="8"
      >
        <cv-checkbox
            value="checked-requested"
            :label="$t('absenteeRequested')"
            :checked="requested"
            @change="onRequested"
        />

        <p class="mb-6 mt-2 text-base text-white">
          {{ $t("absenteeDesc") }}
        </p>

        <journey-territory-info
            v-if="info.register.territory"
            class="mb-4 text-base"
        />

        <!-- link request ballot -->
        <mark-down
            :content="requestLink"
            class="mb-4 text-base"
        />

        <!-- State link -->
        <mark-down
            v-if="moreLink"
            :content="moreLink"
            class="mb-4 text-base"
        />

        <!-- Request deadline -->
        <mark-down
            v-if="requestDeadline"
            :content="requestDeadline"
            class="mb-4 text-base"
        />

        <!-- Return deadline -->
        <mark-down
            v-if="returnDeadline"
            :content="returnDeadline"
            class="mb-4 text-base"
        />

        <!-- FAQ section -->
        <div
            v-if="hasFaq"
            class="text-xl font-extrabold"
        >
          {{ $t("faq") }}
        </div>

        <!-- ID needed -->
        <journey-f-a-q
            v-if="idNeeded"
            :question="t('absenteeIdFaq')"
            :answer="!!info.mail_in.id_needed"
        >
          <mark-down
              v-if="info.mail_in.id_explainer"
              style="display: inline-block"
              :content="idExplainer"
          />
        </journey-f-a-q>

        <!-- drop-off -->
        <journey-f-a-q
            v-if="hasDropoff"
            :question="t('absenteeDropFaq')"
            :answer="!!info.mail_in?.dropoff"
        >
          <mark-down
              v-if="dropoffExplainer"
              style="display: inline-block"
              :content="dropoffExplainer"
          />
        </journey-f-a-q>

        <!-- any special reason -->
        <journey-f-a-q
            v-if="hasAnyReason"
            :question="t('absenteeReasonFaq')"
            :answer="!!info.mail_in?.any_reason"
        />

        <!-- Need notary? -->
        <journey-f-a-q
            v-if="hasNotary"
            :question="t('absenteeWitnessFaq')"
            :answer="!!info.mail_in?.without_notary"
        />
      </cv-column>
      <cv-column
          :sm="4"
          :lg="8"
      >
        <div class="aspect-[4/3] w-full max-w-xl">
          <img
              class="size-full object-cover"
              src="@/assets/images/absentee-page-group-friends-laptop-image-1.jpg"
              :alt="$t('absenteeImageAlt')"
          >
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>
<style scoped lang="css">
.aside__img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
</style>
