<template>
  <div class="countdown--container">
    <div class="countdown--headline">
      <div v-for="headline in headlines">{{ headline }}</div>
    </div>
    <div class="countdown--numbers">
      <div>
        {{ days }}
        <div class="oval">
          <img alt="" src="@/assets/images/skewed-oval-empty.svg" />
        </div>
        <div class="unit">Days</div>
      </div>
      <div>
        :{{ hours.toString().padStart(2, "0") }}
        <div class="oval">
          <img alt="" src="@/assets/images/skewed-oval-empty.svg" />
        </div>
        <div class="unit">Hours</div>
      </div>
      <div>
        :{{ minutes }}
        <div class="oval">
          <img alt="" src="@/assets/images/skewed-oval-empty.svg" />
        </div>
        <div class="unit">Minutes</div>
      </div>
      <div>
        :{{ seconds }}
        <div class="oval">
          <img alt="" src="@/assets/images/skewed-oval-empty.svg" />
        </div>
        <div class="unit">Seconds</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DateTime, Interval } from "luxon";
const headlines = ref("Days until the/2024/Presidential Election".split("/"));
const election = ref("20241105T120000"); // Tuesday, November 5, 2024 7:00:00 AM GMT-05:00
const days = ref(0);
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
@import "@/assets/scss/theme";
//@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Caprasimo&display=swap");

.countdown {
  &--container {
    background-color: $ff-red-01;
    width: calc(100vw - 6rem);
    height: calc(320px - 4rem);
    padding-left: 6rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
  }
  &--headline {
    div {
      @include type-style("productive-heading-07");
      font-size: 3.1rem;
      font-weight: 500;
      max-width: 320px;
    }

    div:nth-child(1) {
      color: $ff-pink-01;
    }

    div:nth-child(2) {
      color: white;
    }

    div:nth-child(3) {
      color: $ff-blue-03;
    }
  }

  &--numbers {
    display: flex;
    font-size: 8rem;
    //font-family: 'Alfa Slab One', cursive;
    font-family: "Caprasimo", serif;
    color: white;
    margin-left: auto;
    padding-right: 2.5rem;
    align-items: center;
    .unit {
      @include type-style("productive-heading-03");
      font-family: "IBM Plex Sans", sans-serif;
    }
    .oval {
      width: 225px;
      //height: 208px;
      //background-image: url("@/assets/images/skewed-oval-empty.svg");
      //background-repeat: no-repeat;
      //background-position-y: center;
      //background-position-x: center;
      position: absolute;
      z-index: 99;
      top: 0;
      left: 0;
      img {
        width: 100%;
      }
    }
    div {
      position: relative;
      min-width: 225px;
    }
    div:nth-child(1) {
      margin-right: 1.5rem;
    }
    div:nth-child(2) {
      margin-right: 1.5rem;
    }
  }
}
</style>
