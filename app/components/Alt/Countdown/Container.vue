<script setup>
import { DateTime, Duration, Interval } from "luxon";

const { t, locale } = useI18n();

const headlines = computed(() => {
  return t(
    "countdownHeader",
    "Days until the/2024/Presidential Election",
  ).split("/");
});
const election = ref("20261103T050000"); // Tuesday, November 3, 2026 7:00:00 AM GMT-05:00
const days = ref(432);
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");
function updateCountdown() {
  const now = DateTime.now();
  const electionDt = DateTime.fromISO(election.value);
  const interval = Interval.fromDateTimes(now, electionDt);
  const duration = interval.toDuration([
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ]);
  days.value = duration.values.days;
  hours.value = duration.values.hours.toString().padStart(2, "0");
  minutes.value = duration.values.minutes.toString().padStart(2, "0");
  seconds.value = duration.values.seconds.toString().padStart(2, "0");
}
function titleCase(s) {
  if (["en", "es"].includes(locale.value))
    return s.at(0).toUpperCase() + s.slice(1);
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
const labelHours = computed(() => {
  return titleCase(
    Duration.fromObject({ hours: 0 }, { locale: locale.value })
      .toHuman()
      .slice(1)
      .trim(),
  );
});
const labelMinutes = computed(() => {
  return titleCase(
    Duration.fromObject({ minutes: 0 }, { locale: locale.value })
      .toHuman()
      .slice(1)
      .trim(),
  );
});
const labelSeconds = computed(() => {
  return titleCase(
    Duration.fromObject({ seconds: 0 }, { locale: locale.value })
      .toHuman()
      .slice(1)
      .trim(),
  );
});
let intervalID;
onMounted(() => {
  updateCountdown();
  intervalID = setInterval(updateCountdown, 1000);
});
onBeforeUnmount(() => clearInterval(intervalID));
</script>

<template>
  <div
    class="flex size-full items-center justify-between
      bg-ff-red-01 px-3"
  >
    <div class="text-base sm:text-lg md:text-3xl xl:text-4xl 3xl:text-7xl">
      <div class="text-ff-white-01">
        {{ headlines[0] }}
      </div>
      <div class="text-white">
        {{ headlines[1] }}
      </div>
      <div class="text-ff-white-01">
        {{ headlines[2] }}
      </div>
    </div>
    <div
      class="flex flex-row items-center justify-between gap-x-1 text-white"
    >
      <alt-countdown-number
        :label="labelDays"
        :number="days"
        prefix=""
      />
      <alt-countdown-number
        :label="labelHours"
        :number="hours"
      />
      <alt-countdown-number
        :label="labelMinutes"
        :number="minutes"
      />
      <alt-countdown-number
        :label="labelSeconds"
        :number="seconds"
      />
    </div>
  </div>
</template>

<style scoped lang="css">
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Caprasimo&display=swap");
</style>
