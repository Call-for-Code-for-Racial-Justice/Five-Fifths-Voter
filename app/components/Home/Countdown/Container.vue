<script setup lang="ts">
import { DateTime, Duration, Interval } from "luxon";

const { locale } = useI18n();

const election = ref("20261103T050000"); // Tuesday, November 3, 2026 7:00:00 AM GMT-05:00
const days = ref(432);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

function updateCountdown() {
  const now = DateTime.now();
  const electionDt = DateTime.fromISO(election.value);
  const interval = Interval.fromDateTimes(now, electionDt);
  const duration = interval.toDuration([
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds", // needed to keep seconds rounded properly
  ]);
  days.value = duration.days;
  hours.value = duration.hours;
  minutes.value = duration.minutes;
  seconds.value = duration.seconds;
}

function titleCase(s: string) {
  if (["en", "es"].includes(locale.value) && s.at(0))
    return s.at(0)?.toUpperCase() + s.slice(1);
  else return s;
}

const labelDays = computed(() => {
  return titleCase(
    Duration.fromObject({ days: 0 }, { locale: locale.value })
      .toHuman()
      .slice(1)
      .trim(),
  );
});
const labelDys = computed(() => {
  return Duration.fromObject({ days: 0 }, { locale: locale.value })
    .toHuman()
    .slice(1)
    .trim();
});

const labelHours = computed(() => {
  return titleCase(
    Duration.fromObject({ hours: 0 }, { locale: locale.value })
      .toHuman()
      .slice(1)
      .trim(),
  );
});
const labelHrs = computed(() => {
  return Duration.fromObject({ hours: 0 }, { locale: locale.value })
    .toHuman({ unitDisplay: "short" })
    .slice(1)
    .trim();
});

const labelMinutes = computed(() => {
  return titleCase(
    Duration.fromObject({ minutes: 0 }, { locale: locale.value })
      .toHuman()
      .slice(1)
      .trim(),
  );
});
const labelMin = computed(() => {
  return Duration.fromObject({ minutes: 0 }, { locale: locale.value })
    .toHuman({ unitDisplay: "short" })
    .slice(1)
    .trim();
});

const labelSeconds = computed<string>(() => {
  return titleCase(
    Duration.fromObject({ seconds: 0 }, { locale: locale.value })
      .toHuman()
      .slice(1)
      .trim(),
  );
});
const labelSec = computed<string>(() => {
  return Duration.fromObject({ seconds: 0 }, { locale: locale.value })
    .toHuman({ unitDisplay: "short" })
    .slice(1)
    .trim();
});

let intervalID: NodeJS.Timeout;
onMounted(() => {
  updateCountdown();
  intervalID = setInterval(updateCountdown, 1000);
});
onBeforeUnmount(() => clearInterval(intervalID));
</script>

<template>
  <footer
      class="sticky [@media(max-height:568px)]:static left-0 -mx-1 bottom-0 z-20 h-20 bg-error md:h-28 xl:h-32 3xl:h-64 p-2 flex items-center justify-center overflow-hidden">
    <div class="text-error-content p-2 font-semibold text-lg [@media(max-width:320px)]:text-xs md:text-3xl lg:text-4xl flex-1 max-w-lg">
      {{ $t("countdownHeader", "Days until the 2026 US Midterm Election") }}
    </div>
    <div class="grid auto-cols-max grid-flow-col gap-1 md:gap-5 text-center">
      <HomeCountdownNumber :value="days" :label="labelDays" :mobile-label="labelDys"/>
      <HomeCountdownNumber :value="hours" :label="labelHours" :mobile-label="labelHrs"/>
      <HomeCountdownNumber :value="minutes" :label="labelMinutes" :mobile-label="labelMin"/>
      <HomeCountdownNumber :value="seconds" :label="labelSeconds" :mobile-label="labelSec" />
    </div>
  </footer>
</template>

<style scoped lang="css">

</style>
