<template>
  <span class="source-badge" :class="sourceClass">
    {{ sourceText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

const sourceText = computed(() => {
  switch (props.source) {
    case 'content':
      return 'Content';
    case 'api':
      return 'API';
    default:
      return 'Unknown';
  }
});

const sourceClass = computed(() => {
  switch (props.source) {
    case 'content':
      return 'source-badge-content';
    case 'api':
      return 'source-badge-api';
    default:
      return 'source-badge-unknown';
  }
});
</script>

<style scoped>
.source-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.source-badge-content {
  background-color: #6200ea;
  color: white;
}

.source-badge-api {
  background-color: #007bff;
  color: white;
}

.source-badge-unknown {
  background-color: #ccc;
  color: black;
}
</style>
