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
  query: { date: "11-03-2026", state: usaState },
});
</script>

<template>
  <div>
    <div
      v-if="candidates?.data?.value?.length > 0"
      class="mt-1 md:text-xl"
    >
      {{ $t("getInformedTopContests") }}
    </div>
    <cv-data-table
      v-if="candidates?.data?.value?.length > 0"
      :expandable="true"
    >
      <template #headings>
        <cv-data-table-heading
          id="table-candidate-name"
          heading="Name"
          name="name"
          class="!text-ff-purple-01"
        />
        <cv-data-table-heading
          id="table-election-name"
          heading="Election"
          name="election"
          class="!text-ff-purple-01"
        />
        <cv-data-table-heading
          id="table-candidate-party"
          heading="Party"
          name="party"
          class="!text-ff-purple-01"
        />
      </template>
      <template #data>
        <cv-data-table-row
          v-for="row in candidates?.data?.value"
          :key="row._id"
          :value="row._id"
        >
          <cv-data-table-cell
            headers="table-candidate-name"
            class="!text-ff-purple-01"
          >
            {{ row.name }}
          </cv-data-table-cell>
          <cv-data-table-cell
            headers="table-election-name"
            class="!text-ff-purple-01"
          >
            {{ row.candidate }}
          </cv-data-table-cell>
          <cv-data-table-cell
            headers="table-candidate-party"
            class="!text-ff-purple-01"
          >
            <IconDemocrat
              v-if="row.party === 'Democrat'"
              class="w-8 lg:w-16"
            />
            <IconLibertarian
              v-else-if="row.party === 'Libertarian'"
              class="w-8 lg:w-16"
            />
            <IconRepublican
              v-else-if="row.party === 'Republican'"
              class="w-8 lg:w-16"
            />
            <IconGreenParty
              v-else-if="row.party === 'Green Party'"
              class="w-8 p-1 lg:w-16 lg:p-2"
            />
            <div v-else>
              {{ row.party }}
            </div>
          </cv-data-table-cell>
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
                <WebIcon
                  v-if="social === 'website'"
                  aria-label="candidate website"
                />
                <FacebookIcon
                  v-else-if="social === 'fb'"
                  aria-label="candidate facebook site"
                />
                <YoutubeIcon
                  v-else-if="social === 'yt'"
                  aria-label="candidate youtube site"
                />
                <TwitterIcon
                  v-else-if="social === 'x'"
                  aria-label="candidate x site"
                />
                <InstagramIcon
                  v-else-if="social === 'gram'"
                  aria-label="candidate instagram sie"
                />
                <IconTikTok
                  v-else-if="social === 'tt'"
                  class="p-1"
                  aria-label="candidate TikTok site"
                />
                <GenericIcon v-else />
              </cv-link>
            </div>
          </template>
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <div
      v-else
      class="mt-2 text-xl"
    >
      {{ $t("getInformedNextCheck") }}
    </div>
    <cv-link
      href="https://www.vote411.org/ballot"
      target="_blank"
    >
      {{
        $t("getInformedMoreInfo")
      }}
    </cv-link>
  </div>
</template>

<style scoped lang="css">
::v-deep(.bx--table-expand__svg) {
  fill: var(--carbon--gray-90);
}
::v-deep(.bx--child-row-inner-container) {
  color: var(--carbon--gray-90);
}
::v-deep(.bx--data-table tbody tr:hover td),
::v-deep(.bx--data-table tbody tr:hover th) {
  background: #f0c39c;
}
::v-deep(tr.bx--parent-row.bx--expandable-row:hover + tr[data-child-row] td) {
  background: var(--ff-white-01);
}
</style>
