<template>
  <div
    class="flex h-[320px] w-full items-center justify-between bg-ff-red-01 pl-3 pr-3
      md:pl-14 md:pr-14"
  >
    <div class="text-4xl md:text-6xl 2xl:text-7xl">
      <div class="text-ff-pink-01">{{ headlines[0] }}</div>
      <div class="text-white">{{ headlines[1] }}</div>
      <div class="text-ff-blue-03">{{ headlines[2] }}</div>
    </div>
    <div
      class="flex flex-col items-center justify-between gap-x-10 text-white md:flex-row"
    >
      <div
        class="w-[125px] bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain
          bg-no-repeat align-middle md:w-[unset]"
      >
        <div class="font-[Caprasimo] text-3xl md:text-9xl">{{ days }}</div>
        <div class="pl-[44px] md:pl-[10px]">{{ labelDays }}</div>
      </div>
      <div
        class="w-[125px] bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain
          bg-no-repeat md:w-[unset]"
      >
        <div class="font-[Caprasimo] text-3xl md:text-9xl">:{{ hours }}</div>
        <div class="pl-[44px]">{{ labelHours }}</div>
      </div>
      <div
        class="w-[125px] bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain
          bg-no-repeat md:w-[unset]"
      >
        <div class="font-[Caprasimo] text-3xl md:text-9xl">:{{ minutes }}</div>
        <div class="pl-[44px]">{{ labelMinutes }}</div>
      </div>
      <div
        class="w-[125px] bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain
          bg-no-repeat text-white md:w-[unset]"
      >
        <div class="font-[Caprasimo] text-3xl md:text-9xl">:{{ seconds }}</div>
        <div class="pl-[44px]">{{ labelSeconds }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DateTime, Duration, Interval } from "luxon";

defineOptions({
  name: "HomeCountdown",
});
const { t, locale } = useI18n();

const headlines = computed(() => {
  return t(
    "countdownHeader",
    "Days until the/2024/Presidential Election",
  ).split("/");
});
const election = ref("20241105T050000"); // Tuesday, November 5, 2024 7:00:00 AM GMT-05:00
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

<style scoped lang="scss">
//@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Caprasimo&display=swap");
</style>
