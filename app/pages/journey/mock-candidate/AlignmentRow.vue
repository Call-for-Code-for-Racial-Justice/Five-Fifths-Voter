<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  score: { type: Number, required: true },
  tag: { type: String, default: "" },
  open: { type: Boolean, default: false },
  rationale: { type: String, default: "" },
  sources: { type: Array, default: () => [] },
});

const pct = computed(() => Math.max(0, Math.min(100, (props.score / 3) * 100)));

const fillClass = computed(() => {
  if (props.score <= 0) return "bg-slate-100";
  if (props.score === 1) return "bg-teal-100";
  if (props.score === 2) return "bg-teal-300";
  return "bg-teal-600";
});

const labelClass = computed(() => {
  if (props.score <= 0) return "text-slate-500";
  return "text-slate-800";
});
</script>

<template>
  <div>
    <button
        type="button"
        class="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left hover:bg-slate-50"
        @click="$emit('toggle')"
    >
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <div class="truncate text-sm font-medium" :class="labelClass">{{ label }}</div>
          <span
              v-if="tag"
              class="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-amber-200"
          >
            {{ tag }}
          </span>
        </div>
        <div class="mt-2 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 h-8">
          <div
              class="h-full rounded-full transition-all"
              :class="fillClass"
              :style="{ width: pct + '%' }"
              aria-hidden="true"
          />
        </div>
      </div>

      <div class="shrink-0 text-right">
        <div class="text-xs text-slate-500">Score</div>
        <div class="mt-1 font-mono text-sm font-semibold text-slate-900">{{ score }}/3</div>
      </div>

      <svg
          class="ml-1 h-4 w-4 shrink-0 text-slate-400 transition-transform"
          :class="open ? 'rotate-180' : 'rotate-0'"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
      >
        <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clip-rule="evenodd"
        />
      </svg>
    </button>

    <div v-if="open" class="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div class="text-xs font-medium text-slate-700">Rationale</div>
      <p class="mt-1 text-sm text-slate-700">{{ rationale || 'No rationale provided.' }}</p>

      <div class="mt-3">
        <div class="text-xs font-medium text-slate-700">Sources</div>
        <ul class="mt-1 space-y-1">
          <li v-for="(s, idx) in sources" :key="idx" class="text-sm">
            <a
                :href="s.href"
                target="_blank"
                rel="noreferrer"
                class="text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-900"
            >
              {{ s.label }}
            </a>
          </li>
          <li v-if="!sources || sources.length === 0" class="text-sm text-slate-600">
            No sources provided.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
