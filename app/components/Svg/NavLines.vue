<script setup>
defineOptions({
  name: "NavLines",
});
defineProps({
  fill: { type: String, default: "currentColor" },
});
</script>

<template>
  <svg
    width="677"
    height="157"
    viewBox="0 0 677 157"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="1"
      height="157"
      :fill="fill"
    />
    <rect
      x="224"
      y="139"
      width="1"
      height="18"
      :fill="fill"
    />
    <rect
      x="465"
      y="139"
      width="1"
      height="18"
      :fill="fill"
    />
    <rect
      x="676"
      y="139"
      width="1"
      height="18"
      :fill="fill"
    />
    <rect
      y="139"
      width="676"
      height="1"
      :fill="fill"
    />
  </svg>
</template>
