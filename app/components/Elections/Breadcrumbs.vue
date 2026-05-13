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
  <nav class="breadcrumbs text-sm" role="navigation" aria-label="Breadcrumb">
    <ol>
      <li><NuxtLink to="/journey/getInformed">Dashboard</NuxtLink></li>
      <li v-for="item in visibleItems" :key="item.label">
        <NuxtLink v-if="item.to" class="max-w-[20ch] truncate inline-block" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else class="max-w-[20ch] truncate inline-block" aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
