<script setup>
import { isUserRegistered, isUserRequestedBallot } from "~/composables/user";

const user = useUser();
onMounted(() => {
  loadApproxLocation();
});
</script>

<template>
  <div class="mt-32 flex flex-row items-center justify-center">
    <div>
      <div class="current-location">
        {{
          $t("journeyPageElectionState", {
            state: user?.info?.location?.region,
          })
        }}
      </div>
      <journey-select-state />
      <cv-grid kind="wide">
        <cv-row class="my-8">
          <cv-column
            :lg="5"
            :sm="2"
          >
            <nav-card
              :title="$t('journeyPageRegisteredLabel')"
              image-src="journey/elderly-lady-glasses.jpg"
              to="/journey/register"
              :checked="isUserRegistered()"
            />
          </cv-column>
          <cv-column
            :lg="5"
            :sm="2"
          >
            <nav-card
              :title="$t('journeyPageBallotLabel')"
              image-src="journey/absentee-page-group-friends-laptop.jpg"
              to="/journey/mailInBallot"
              :checked="isUserRequestedBallot()"
            />
          </cv-column>
          <cv-column
            :lg="5"
            :sm="2"
          >
            <nav-card
              :title="$t('journeyPageGetInformedLabel')"
              image-src="vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg"
              to="/journey/getInformed"
            />
          </cv-column>
          <cv-column
            :lg="0"
            :sm="2"
          >
            <nav-card
              :title="$t('journeyPageVoteNowLabel')"
              image-src="journey/grandpa-grandson.jpeg"
              to="/journey/voteInPerson"
            />
          </cv-column>
        </cv-row>
        <cv-row>
          <cv-column :lg="2" />
          <cv-column
            :lg="5"
            :sm="0"
          >
            <nav-card
              :title="$t('journeyPageVoteNowLabel')"
              image-src="journey/grandpa-grandson.jpeg"
              to="/journey/voteInPerson"
            />
          </cv-column>
          <cv-column
            :lg="5"
            :sm="2"
          >
            <nav-card
              :title="$t('journeyPageDeliverLabel')"
              image-src="ballot-return-image-1.jpg"
              image-class="object-[0_39%]"
              to="/journey/ballotReturn"
            />
          </cv-column>
        </cv-row>
      </cv-grid>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/theme";
</style>
