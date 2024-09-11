<script setup>
import {
  LogoFacebook32 as FacebookIcon,
  LogoX32 as TwitterIcon,
  LogoYoutube32 as YoutubeIcon,
  LogoInstagram32 as InstagramIcon,
  Wikis32 as WebIcon,
  Share32 as GenericIcon,
} from "@carbon/icons-vue";

const user = useUser();
const usaState = computed(() => {
  return user.value?.info?.location?.region_code?.toLowerCase();
});
const candidates = useFetch("/api/candidateInfo", {
  query: { date: "2024", state: usaState },
});
</script>

<template>
  <div>
    <div v-if="candidates?.data?.value?.length > 0" class="mt-1 md:text-xl">
      {{ $t("getInformedTopContests") }}
    </div>
    <cv-data-table
      v-if="candidates?.data?.value?.length > 0"
      :expandable="true"
    >
      <template #headings>
        <cv-data-table-heading heading="Name" name="name" />
        <cv-data-table-heading heading="Election" name="election" />
        <cv-data-table-heading heading="Party" name="party" />
      </template>
      <template #data>
        <cv-data-table-row
          v-for="row in candidates?.data?.value"
          :key="row._id"
          :value="row._id"
        >
          <cv-data-table-cell class="!text-ff-purple-01">{{
            row.name
          }}</cv-data-table-cell>
          <cv-data-table-cell class="!text-ff-purple-01">{{
            row.candidate
          }}</cv-data-table-cell>
          <cv-data-table-cell class="!text-ff-purple-01">
            <icon-democrat
              v-if="row.party === 'Democrat'"
              class="w-8 lg:w-16"
            />
            <icon-libertarian
              v-else-if="row.party === 'Libertarian'"
              class="w-8 lg:w-16"
            />
            <icon-republican
              v-else-if="row.party === 'Republican'"
              class="w-8 lg:w-16"
            />
            <icon-green-party
              v-else-if="row.party === 'Green Party'"
              class="w-8 p-1 lg:w-16 lg:p-2"
            />
            <div v-else>{{ row.party }}</div></cv-data-table-cell
          >
          <template #expandedContent>
            <div class="flex gap-1">
              <cv-link
                v-for="social in Object.keys(row.social)"
                :key="`${social}-${row._id}`"
                :alt="social"
                :href="row.social[social]"
                target="_blank"
                class="!text-ff-purple-01"
              >
                <web-icon v-if="social === 'website'" />
                <facebook-icon v-else-if="social === 'fb'" />
                <youtube-icon v-else-if="social === 'yt'" />
                <twitter-icon v-else-if="social === 'x'" />
                <instagram-icon v-else-if="social === 'gram'" />
                <icon-tik-tok v-else-if="social === 'tt'" class="p-1" />
                <generic-icon v-else />
              </cv-link>
            </div>
          </template>
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <div v-else class="mt-2 text-xl">
      {{ $t("getInformedNextCheck") }}
    </div>
    <cv-link href="https://www.vote411.org/ballot" target="_blank">{{
      $t("getInformedMoreInfo")
    }}</cv-link>
  </div>
</template>

<style scoped lang="scss">
@import "~/assets/scss/theme";
::v-deep(.bx--table-expand__svg) {
  fill: $carbon--gray-90;
}
::v-deep(.bx--child-row-inner-container) {
  color: $carbon--gray-90;
}
::v-deep(.bx--data-table tbody tr:hover td),
::v-deep(.bx--data-table tbody tr:hover th) {
  background: #f0c39c;
}
::v-deep(tr.bx--parent-row.bx--expandable-row:hover + tr[data-child-row] td) {
  background: $ff-white-01;
}
</style>
