<template>
  <div class="page__title">{{ $t("absenteeTitle") }}</div>
  <cv-grid :full-width="true">
    <cv-row>
      <cv-column :sm="4" :lg="8">
        <cv-checkbox
          value="checked-requested"
          :label="$t('absenteeRequested')"
          :checked="requested"
          @change="onRequested"
        />

        <p class="journey__desc">
          {{ $t("absenteeDesc") }}
        </p>

        <journey-territory-info
          v-if="info.register.territory"
          class="journey__info"
        />

        <!-- link request ballot -->
        <mark-down :content="requestLink" class="journey__info" />

        <!-- State link -->
        <mark-down v-if="moreLink" :content="moreLink" class="journey__info" />

        <!-- Request deadline -->
        <mark-down
          v-if="requestDeadline"
          :content="requestDeadline"
          class="journey__info"
        />

        <!-- Return deadline -->
        <mark-down
          v-if="returnDeadline"
          :content="returnDeadline"
          class="journey__info"
        />

        <!-- FAQ section -->
        <div v-if="hasFaq" class="journey__faq__header">{{ $t("faq") }}</div>

        <!-- ID needed -->
        <div v-if="idNeeded" class="journey__faq">
          <span>{{ $t("absenteeIdFaq") }}</span>
          <span>{{ info.mail_in.id_needed ? $t("yes") : $t("no") }}</span>

          <mark-down
            v-if="info.mail_in.id_explainer"
            style="display: inline-block"
            :content="idExplainer"
          />
        </div>

        <!-- drop-off -->
        <div v-if="hasDropoff" class="journey__faq">
          <span>{{ $t("absenteeDropFaq") }}</span
          ><span>{{ info.mail_in.dropoff ? $t("yes") : $t("no") }}</span>
          <mark-down
            v-if="dropoffExplainer"
            style="display: inline-block"
            :content="dropoffExplainer"
          />
        </div>

        <!-- any special reason -->
        <div v-if="hasAnyReason" class="journey__faq">
          <span>{{ $t("absenteeReasonFaq") }}</span
          ><span>{{ !info.mail_in.any_reason ? $t("yes") : $t("no") }}</span>
        </div>

        <!-- Need notary? -->
        <div v-if="hasNotary" class="journey__faq">
          <span>{{ $t("absenteeWitnessFaq") }}</span
          ><span>{{
            !info.mail_in.without_notary ? $t("yes") : $t("no")
          }}</span>
        </div>
      </cv-column>
      <cv-column :sm="4" :lg="8">
        <img
          class="side-image"
          src="@/assets/images/absentee-page-group-friends-laptop-image-1.jpg"
          :alt="$t('absenteeImageAlt')"
        />
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
import electionInfo from "@/assets/data/usa-2024.json";

const { t } = useI18n();
const user = useUser();
const usaCode = computed(() => user.value.info?.location?.region_code);
const requested = computed(() =>
  Boolean(user.value.info?.requested_early === "presidential-2024"),
);
const info = computed(() => {
  const code = usaCode.value?.toLowerCase() || "unknown";
  return electionInfo[code] || { register: { territory: true } };
});

const requestLink = computed(() => {
  const requestUrl =
    info.value?.mail_in?.request_link ||
    "https://www.vote.org/absentee-ballot/";
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
    "id_needed" in faq ||
    "online" in faq ||
    "dropoff" in faq ||
    "any_reason" in faq ||
    "without_notary" in faq
  );
});

const idNeeded = computed(() => {
  const faq = info.value?.mail_in || {};
  return "id_needed" in faq;
});

const idExplainer = computed(() => {
  const explainer = info.value?.mail_in?.id_explainer;
  const idLink =
    info.value?.mail_in?.id_link ||
    "https://www.ncsl.org/elections-and-campaigns/voter-id";
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

const onRequested = (val) => setUserRequested(val);
</script>
<style scoped lang="scss">
@import "@/assets/scss/theme";
@import "@/assets/scss/pages";
@import "@/assets/scss/journey";
.aside__img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
</style>
