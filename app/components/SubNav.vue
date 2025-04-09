<script setup>
import {
  CircleFilled16 as CircleFilled,
  CircleOutline16 as IconOther,
} from "@carbon/icons-vue";
/**
 * Sup Page
 * @typedef {object} SubPage
 * @property {string} page URL for the subpage (no leading slash)
 * @property {string} label Label for the link to the subpage
 */

defineProps({
  current: { type: String, required: true },
  subPages: {
    type: Array,
    required: true,
    validator: (v) => {
      if (!Array.isArray(v)) {
        console.error(`sub-pages must be an array instead of ${typeof v});`);
        return false;
      }
      for (let i = 0; i < v.length; i++) {
        const subPage = v[i];
        if (typeof subPage !== "object") {
          console.error(
            `sub-page must be an object instead of ${typeof subPage});`,
          );
          return false;
        }
        if (!("page" in subPage)) {
          console.error("sub-page must include \"page\"", subPage);
          return false;
        }
        if (!("label" in subPage)) {
          console.error("sub-page must include \"label\"", subPage);
          return false;
        }
      }
      return true;
    },
  },
  prefix: { type: String, required: true },
});
</script>

<template>
  <cv-breadcrumb
    class="fixed left-1 top-24 z-50 hidden h-6 w-full bg-ff-purple-01 md:block"
  >
    <cv-breadcrumb-item
      v-for="step in subPages"
      :key="step.page"
    >
      <div v-if="current === step.page">
        {{ step.label }}
      </div>
      <cv-link
        v-else
        :to="`${prefix}/${step.page}`"
      >
        {{ step.label }}
      </cv-link>
    </cv-breadcrumb-item>
  </cv-breadcrumb>
  <div
    class="fixed left-1 top-24 z-50 flex w-full flex-row gap-4 bg-ff-purple-01
      text-ff-white-01 md:hidden"
  >
    <div
      v-for="step in subPages"
      :key="step.page"
      class="py-2"
    >
      <circle-filled v-if="current === step.page" />
      <cv-link
        v-else
        :to="`${prefix}/${step.page}`"
      >
        <icon-other />
      </cv-link>
    </div>
  </div>
</template>
