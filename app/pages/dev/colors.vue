<script setup lang="ts">
if (!import.meta.dev) {
  throw createError({ statusCode: 404 });
}

definePageMeta({ layout: false });

const daisyGroups = [
  {
    title: "Base",
    colors: ["base-100", "base-200", "base-300", "base-content"],
  },
  {
    title: "Brand",
    colors: ["primary", "primary-content", "secondary", "secondary-content", "accent", "accent-content"],
  },
  {
    title: "Neutral",
    colors: ["neutral", "neutral-content"],
  },
  {
    title: "State",
    colors: ["info", "info-content", "success", "success-content", "warning", "warning-content", "error", "error-content"],
  },
];

const customColors = [
  "ff-purple-01", "ff-purple-02",
  "ff-white-01",
  "ff-yellow-01", "ff-yellow-02",
  "ff-orange-01",
  "ff-red-01",
  "ff-pink-01", "ff-pink-02",
  "ff-blue-01", "ff-blue-02", "ff-blue-03",
  "ff-green-01", "ff-green-02",
];

const tailwindHues = [
  "slate", "coolGray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
];

const tailwindShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content p-8">
    <div class="max-w-7xl mx-auto space-y-12">

      <div class="flex items-center justify-between border-b border-base-300 pb-4">
        <h1 class="text-3xl font-bold font-mono">
          Color Palette
          <span class="badge badge-warning badge-sm align-middle ml-2">DEV</span>
        </h1>
        <ThemeToggle />
      </div>

      <!-- DaisyUI Semantic Colors -->
      <section class="space-y-6">
        <h2 class="text-lg font-semibold tracking-wide uppercase opacity-60">DaisyUI Semantic</h2>
        <div v-for="group in daisyGroups" :key="group.title" class="space-y-2">
          <h3 class="text-xs font-mono uppercase tracking-widest opacity-40">{{ group.title }}</h3>
          <div class="flex flex-wrap gap-4">
            <div v-for="name in group.colors" :key="name" class="flex flex-col items-center gap-1.5">
              <div
                class="rounded-lg shadow-sm border border-base-content/10"
                :style="{ backgroundColor: `var(--color-${name})`, width: '3.5rem', height: '3.5rem' }"
              />
              <span class="text-xs font-mono opacity-60 max-w-[4rem] text-center leading-tight">{{ name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Custom Brand Colors -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold tracking-wide uppercase opacity-60">Custom Brand (ff-*)</h2>
        <div class="flex flex-wrap gap-4">
          <div v-for="name in customColors" :key="name" class="flex flex-col items-center gap-1.5">
            <div
              class="rounded-lg shadow-sm border border-base-content/10"
              :style="{ backgroundColor: `var(--color-${name})`, width: '3.5rem', height: '3.5rem' }"
            />
            <span class="text-xs font-mono opacity-60 max-w-[4rem] text-center leading-tight">{{ name }}</span>
          </div>
        </div>
      </section>

      <!-- Custom Badge Variants -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold tracking-wide uppercase opacity-60">Custom Badge Variants</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex flex-col items-center gap-1.5">
            <span class="badge badge-left badge-md px-3">Left</span>
            <span class="text-xs font-mono opacity-60">badge-left</span>
          </div>
          <div class="flex flex-col items-center gap-1.5">
            <span class="badge badge-right badge-md px-3">Right</span>
            <span class="text-xs font-mono opacity-60">badge-right</span>
          </div>
          <div class="flex flex-col items-center gap-1.5">
            <div class="flex gap-1">
              <span class="badge badge-left badge-sm">Left</span>
              <span class="badge badge-right badge-sm">Right</span>
            </div>
            <span class="text-xs font-mono opacity-60">badge-sm</span>
          </div>
        </div>
      </section>

      <!-- Tailwind Base Palette -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold tracking-wide uppercase opacity-60">Tailwind Palette</h2>
        <div class="overflow-x-auto">
          <table class="text-xs font-mono">
            <thead>
              <tr>
                <th class="text-left pr-4 opacity-40 font-normal w-24">hue</th>
                <th
                  v-for="shade in tailwindShades"
                  :key="shade"
                  class="opacity-40 font-normal pb-2 w-8 text-center"
                >
                  {{ shade }}
                </th>
              </tr>
            </thead>
            <tbody class="space-y-1">
              <tr v-for="hue in tailwindHues" :key="hue">
                <td class="pr-4 opacity-60 py-0.5">{{ hue }}</td>
                <td v-for="shade in tailwindShades" :key="shade" class="py-0.5 px-0.5">
                  <div
                    class="rounded-sm"
                    :style="{ backgroundColor: `var(--color-${hue}-${shade})`, width: '1.75rem', height: '1.75rem' }"
                    :title="`${hue}-${shade}`"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </div>
</template>
