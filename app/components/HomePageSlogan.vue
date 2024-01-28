<template>
  <div class="home-one">
    <five-fiths-title id="title-block" />
    <div ref="elSlogan" class="slogan">
      <div class="slogan__whole">
        Overcoming barriers<br />Amplifying voices
      </div>
      <div class="slogan__motto">
        Together, we can change the narrative of historically disenfranchised
        people in our democratic process.
      </div>
    </div>
    <countdown />
  </div>
</template>

<script setup>
defineOptions({
  name: "HomePageSlogan",
});
import { default as actual } from "actual";

const countdownData = inject(
  "countdown-data",
  ref({ height: 320, visible: true }),
);
const elSlogan = ref(null);
const wholeFontSize = ref("3.75rem");
const sloganFontSize = ref("1.75rem");
const sloganHeight = ref("540px");
const sloganTop = ref("88px");
function resize() {
  // squeeze content between the title and the nav bar
  const title = document.querySelector("#title-block");
  if (!title) return;
  const titleBox = title.getBoundingClientRect();
  const topMost = titleBox.y + titleBox.height;
  // bottom most is countdown vh - height - C
  const vh = actual("height", "px");
  const bottomMost = vh - countdownData.value.height - 72;
  const height = bottomMost - topMost;
  const idealHeight = 540; //elSlogan.value?.getBoundingClientRect()?.height;
  const fontScale = height / idealHeight;
  // console.log(
  //   "topMost",
  //   topMost,
  //   "bottomMost",
  //   bottomMost,
  //   "height",
  //   height,
  //   "idealHeight",
  //   idealHeight,
  //   "scale",
  //   fontScale,
  // );
  if (fontScale < 1) {
    wholeFontSize.value = `${3.75 * fontScale}rem`;
    sloganFontSize.value = `${1.75 * fontScale}rem`;
    // console.log("whole", wholeFontSize.value, "slogan", sloganFontSize.value);
  } else {
    wholeFontSize.value = "3.75rem";
    sloganFontSize.value = "1.75rem";
  }
  sloganHeight.value = `${height}px`;
  sloganTop.value = `${topMost + 8}px`;
}
onMounted(() => {
  window.addEventListener("resize", resize);
  resize();
});
onUnmounted(() => window.removeEventListener("resize", resize));
onUpdated(() => resize());
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.home-one {
  align-self: normal;
}
.slogan {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  translate: 0 v-bind(sloganTop);
  height: v-bind(sloganHeight);
  width: 100%;

  &__whole {
    @include type-style("productive-heading-01");
    font-size: v-bind(wholeFontSize);
    transition-property: font-size;
    transition-duration: 1s;
    width: 50%;
    max-width: 580px;
    color: white;
    margin-left: 4rem;
    @include carbon--breakpoint-down(lg) {
      width: calc(100% - 5rem);
      padding-right: 1rem;
    }
    @include carbon--breakpoint-down(md) {
      margin-left: 2rem;
    }
  }

  &__motto {
    @include type-style("body-long-02");
    font-size: v-bind(sloganFontSize);
    transition-property: font-size;
    transition-duration: 1s;
    width: 35%;
    max-width: 480px;
    color: white;
    margin-left: 4rem;
    @include carbon--breakpoint-down(md) {
      width: calc(100% - 5rem);
      padding-right: 1rem;
      margin-left: 2rem;
    }
  }
}
</style>
