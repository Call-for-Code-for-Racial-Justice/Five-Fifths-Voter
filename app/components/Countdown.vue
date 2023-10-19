<template>
  <div class="countdown--container" ref="el">
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
        :{{ hours }}
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
import { default as actual } from "actual";

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

// Resize countdown for the screen
const parent = ref(null);
const el = ref(null);
const paddingLeft = ref("96px");
const width = ref(`${1568 - 96}px`);
const countdownData = inject(
  "countdown-data",
  ref({ height: 320, visible: true }),
);
const height = ref(`${320}px`);
const headlineFontSize = ref("49.5px");
const numberFontSize = ref("128px");
const numberWidth = ref("225px");

function between(val, min, max) {
  return Math.max(Math.min(val, max), min);
}
function resize2() {
  // const vw = actual("width", "px");
  const vh = actual("height", "px");
  if (vh < 1320)
    countdownData.value.height = between((vh / 1320) * 320, 100, 320);
  else countdownData.value.height = 320;

  height.value = `${countdownData.value.height}px`;
}
function resize() {
  if (parent.value) {
    const vw = actual("width", "px");
    const left = between(0.06 * vw, 8, 96);
    paddingLeft.value = `${left}px`;
    width.value = `${vw - left}px`;

    height.value = `${parent.value.clientHeight}px`;

    // at md breakpoint numbers flow as a column
    if (vw < 672) {
      const hFontSize = between((49.5 * vw) / 1568, 32, 49.5);
      headlineFontSize.value = `${hFontSize}px`;

      const nFontSize = between((128 * vw) / 1568, 16, 32);
      numberFontSize.value = `${nFontSize}px`;
    } else {
      const hFontSize = between((49.5 * vw) / 1568, 17.5, 49.5);
      headlineFontSize.value = `${hFontSize}px`;

      const nFontSize = between((128 * vw) / 1568, 16, 128);
      numberFontSize.value = `${nFontSize}px`;
    }

    const nWidth = between((225 * vw) / 1568, 16, 225);
    numberWidth.value = `${nWidth}px`;
  }
}
onMounted(() => {
  parent.value = el.value.parentElement;
  window.addEventListener("resize", resize2);
  resize2();
});
onUnmounted(() => window.removeEventListener("resize", resize));
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
//@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Caprasimo&display=swap");

.countdown {
  &--container {
    background-color: $ff-red-01;
    width: 100%;
    height: v-bind(height);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  &--headline {
    div {
      @include type-style("productive-heading-07");
      font-size: v-bind(headlineFontSize);
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
    @include carbon--breakpoint-down(md) {
      flex-direction: column;
    }
    font-size: v-bind(numberFontSize);
    //font-family: 'Alfa Slab One', cursive;
    font-family: "Caprasimo", serif;
    color: white;
    align-items: center;
    .unit {
      @include type-style("productive-heading-03");
      font-family: "IBM Plex Sans", sans-serif;
    }
    .oval {
      width: v-bind(numberWidth);
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
      min-width: v-bind(numberWidth);
    }
    div:nth-child(1) {
      margin-right: 1.5rem;
      @include carbon--breakpoint-down(lg) {
        margin-right: 0.5rem;
      }
    }
    div:nth-child(2) {
      margin-right: 1.5rem;
      @include carbon--breakpoint-down(lg) {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
