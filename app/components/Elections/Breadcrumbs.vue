<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>();

const visibleItems = computed(() => props.items.filter(item => item.label));
</script>

<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li><NuxtLink to="/journey/getInformed">Dashboard</NuxtLink></li>
      <li v-for="item in visibleItems" :key="item.label">
        <NuxtLink v-if="item.to" class="max-w-[20ch] truncate inline-block" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else class="max-w-[20ch] truncate inline-block">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>
