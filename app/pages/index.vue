<template>
  <div ref="el">
    <main-nav :active-section="activeSection" @nav-section="scrollToSection" />
    <section class="full-page dark">
      <home-slogan />
    </section>
    <section class="full-page white filled-oval">
      <h1>Our mission</h1>
      <p>
        With Five Fifths Voter, we help put the power back in your hands. Our
        platform provides a personalized experience with useful tools to help
        marginalized voters overcome voting process roadblocks. Five Fifths
        Voter takes into account various voting journeys, such as first-time
        voters, veterans, minorities, legally disabled, the elderly, or those
        with felony convictions.
      </p>
    </section>
    <section class="full-page blue">
      <h1>Our values</h1>
      <p>
        Five Fifths Voter will help generate solidarity for disenfranchised
        voting communities and leverage social media platforms for easy access
        to candidate information.
      </p>
    </section>
  </div>
</template>

<script setup>
defineOptions({
  name: "HomePage",
});

definePageMeta({
  layout: "special",
});
provide("countdown-data", ref({ height: 320, visible: true }));

const inMove = ref(false);
const inMoveDelay = ref(400);
const activeSection = ref(0);
/**
 * offset of all the sections on page
 * @type {Ref<UnwrapRef<Array<Number>>>}
 */
const offsets = ref([]);
const touchStartY = ref(0);

/**
 * root div
 * @type {HTMLElement}
 */
const el = ref(null);
function calculateSectionOffsets() {
  if (!el.value) return;
  let sections = el.value.getElementsByTagName("section");
  let length = sections.length;

  for (let i = 0; i < length; i++) {
    let sectionOffset = sections[i].offsetTop;
    offsets.value.push(sectionOffset);
  }
}
onMounted(calculateSectionOffsets);

function scrollToSection(id, force = false) {
  if (inMove.value && !force) return false;

  activeSection.value = id;
  inMove.value = true;

  // get section and scroll into view if it exists
  let section = document.getElementsByTagName("section")[id];
  if (section) {
    document
      .getElementsByTagName("section")
      [id].scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    inMove.value = false;
  }, inMoveDelay.value);
}

function moveDown() {
  inMove.value = true;
  activeSection.value--;

  if (activeSection.value < 0) activeSection.value = 0;

  scrollToSection(activeSection.value, true);
}

function moveUp() {
  inMove.value = true;
  activeSection.value++;

  if (activeSection.value > offsets.value.length - 1)
    activeSection.value = offsets.value.length - 1;

  scrollToSection(activeSection.value, true);
}

/**
 * Move 1 section at a time
 * @param {WheelEvent} e
 * @returns {boolean}
 */
function handleMouseWheel(e) {
  if (e.wheelDelta < 30 && !inMove.value) {
    moveUp();
  } else if (e.wheelDelta > 30 && !inMove.value) {
    moveDown();
  }

  e.preventDefault();
  return false;
}
/**
 * Hande mouse wheel - FireFox
 * @param {WheelEvent} e
 * @returns {boolean}
 */
function handleMouseWheelDOM(e) {
  if (e.detail > 0 && !inMove.value) {
    moveUp();
  } else if (e.detail < 0 && !inMove.value) {
    moveDown();
  }

  return false;
}

/**
 * Update touch data
 * @param {TouchEvent} e
 */
function touchStart(e) {
  e.preventDefault();

  touchStartY.value = e.touches[0].clientY;
}

/**
 * Update touch data
 * @param {TouchEvent} e
 */
function touchMove(e) {
  if (inMove.value) return false;
  e.preventDefault();

  const currentY = e.touches[0].clientY;

  if (touchStartY.value < currentY) {
    moveDown();
  } else {
    moveUp();
  }

  touchStartY.value = 0;
  return false;
}

function listenToScrolls() {
  window.addEventListener("DOMMouseScroll", handleMouseWheelDOM); // Mozilla Firefox
  window.addEventListener("mousewheel", handleMouseWheel, {
    passive: false,
  }); // Other browsers

  window.addEventListener("touchstart", touchStart, {
    passive: false,
  }); // mobile devices
  window.addEventListener("touchmove", touchMove, {
    passive: false,
  }); // mobile devices
}
function stopListeningToScrolls() {
  window.removeEventListener("DOMMouseScroll", handleMouseWheelDOM); // Mozilla Firefox
  window.removeEventListener("mousewheel", handleMouseWheel, {
    passive: false,
  }); // Other browsers

  window.removeEventListener("touchstart", touchStart); // mobile devices
  window.removeEventListener("touchmove", touchMove); // mobile devices
}
onMounted(listenToScrolls);
onBeforeUnmount(stopListeningToScrolls);
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.full-page {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}
section.dark {
  background-color: $ff-green-02;
  justify-content: normal;
  background-image: url("@/assets/images/mask-group.svg");
  background-size: cover;
  background-repeat: repeat-x;
  @include carbon--breakpoint(max) {
    background-size: contain;
    background-color: $ff-purple-01;
  }
}
section.white {
  background-color: $ff-white-01;
  h1 {
    color: $ff-orange-01;
    margin-top: 16rem;
  }
  p {
    width: 36%;
  }
  justify-content: flex-start;
}
section.blue {
  background-color: $ff-blue-01;
  h1 {
    color: $ff-blue-03;
  }
  p {
    color: white;
    background-color: $ff-blue-03;
    padding: 4px;
    width: 86%;
    min-height: 20%;
  }
}
section.filled-oval {
  background-image: url("@/assets/images/skewed-oval.svg");
  background-repeat: no-repeat;
  background-size: 55%;
  background-position-y: 5rem;
  background-position-x: center;
  @media (orientation: portrait) {
    background-image: url("@/assets/images/skewed-oval-vert.svg");
  }
}
</style>
