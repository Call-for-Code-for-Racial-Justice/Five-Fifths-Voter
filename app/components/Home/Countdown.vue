<template>
  <div
    class="w-full h-[320px] bg-ff-red-01 flex justify-between items-center pl-3 md:pl-14 pr-3 md:pr-14"
  >
    <div class="text-4xl md:text-7xl">
      <div class="text-ff-pink-01">{{ headlines[0] }}</div>
      <div class="text-white">{{ headlines[1] }}</div>
      <div class="text-ff-blue-03">{{ headlines[2] }}</div>
    </div>
    <div
      class="text-white flex justify-between items-center flex-col md:flex-row gap-x-10"
    >
      <div
        class="align-middle bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain bg-no-repeat w-[125px] md:w-[unset]"
      >
        <div class="text-3xl md:text-9xl font-[Caprasimo]">{{ days }}</div>
        <div class="pl-[44px] md:pl-[10px]">Days</div>
      </div>
      <div
        class="bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain bg-no-repeat w-[125px] md:w-[unset]"
      >
        <div class="text-3xl md:text-9xl font-[Caprasimo]">:{{ hours }}</div>
        <div class="pl-[44px]">Hours</div>
      </div>
      <div
        class="bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain bg-no-repeat w-[125px] md:w-[unset]"
      >
        <div class="text-3xl md:text-9xl font-[Caprasimo]">:{{ minutes }}</div>
        <div class="pl-[44px]">Minutes</div>
      </div>
      <div
        class="text-white bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain bg-no-repeat w-[125px] md:w-[unset]"
      >
        <div class="text-3xl md:text-9xl font-[Caprasimo]">:{{ seconds }}</div>
        <div class="pl-[44px]">Seconds</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DateTime, Interval } from "luxon";

const headlines = ref("Days until the/2024/Presidential Election".split("/"));
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
