<template>
  <div>
    <div v-for="(line, index) in lines" :key="`${index}-${line}`">
      {{ line }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: { type: String, default: "" },
});
const lines = computed(() => {
  const list = props.content.split("\n");
  const end = list.length - 1;
  const augmented = [];
  for (let i = 0; i < list.length; i++) {
    if (i === 0 || i === end) augmented.push(list[i]);
    else {
      augmented.push(list[i]);
      augmented.push("\n");
    }
  }
  return augmented;
});
</script>

<style scoped lang="scss"></style>
