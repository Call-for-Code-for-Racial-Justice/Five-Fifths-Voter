<template>
  <cv-header-panel
    id="user-panel"
    :class="{
      '-mt-4': headerSize === 'thin',
      'mt-12': headerSize === 'thick',
    }"
  >
    <div v-if="user.info.sub" class="p-3 text-2xl">
      <div v-if="user.info.given_name">Welcome {{ user.info.given_name }}</div>
      <div v-else-if="user.info.name">Welcome {{ user.info.name }}</div>
      <div v-else>Welcome</div>
      <div v-if="!user.info.email_verified">
        Please check your inbox and follow the instructions to validate your
        email address
      </div>
      <div class="text-[12px]">{{ user.info.email }}</div>
      <cv-link href="/auth/logout"
        ><span class="mr-3">Logout</span> <logout-icon
      /></cv-link>
    </div>
  </cv-header-panel>
</template>
<script setup>
import { Logout20 as LogoutIcon } from "@carbon/icons-vue";

defineProps({
  headerSize: { type: String, default: "thin" },
});
const user = useUserStore();
</script>
