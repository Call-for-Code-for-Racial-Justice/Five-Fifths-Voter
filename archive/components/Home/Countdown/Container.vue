<script setup>
import { DateTime, Duration, Interval } from "luxon";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
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
  <footer class="sticky left-0 -mx-1 bottom-0 z-20 h-20 bg-ff-red-01 md:h-28 xl:h-32 3xl:h-64">
    <div
    class="flex size-full items-center justify-between px-3"
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
      <HomeCountdownNumber
        :label="labelDays"
        :number="days"
        prefix=""
      />
      <HomeCountdownNumber
        :label="labelHours"
        :number="hours"
      />
      <HomeCountdownNumber
        :label="labelMinutes"
        :number="minutes"
      />
      <HomeCountdownNumber
          v-if="width > 370"
        :label="labelSeconds"
        :number="seconds"
      />
    </div>
  </div>
  </footer>
</template>

<style scoped lang="css">
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Caprasimo&display=swap");
</style>
