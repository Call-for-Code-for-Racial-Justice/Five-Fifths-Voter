<template>
  <div class="mt-[8rem] flex flex-row items-center justify-center">
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
          <cv-column :lg="5" :sm="2">
            <nav-card
              title="Are you registered to vote?"
              image-src="register-page-woman-in-sun-image-1.jpeg"
              to="/journey/register"
              :checked="isUserRegistered()"
            />
          </cv-column>
          <cv-column :lg="5" :sm="2">
            <nav-card
              title="Mail in ballot?"
              image-src="absentee-page-group-friends-laptop-image-1.jpg"
              to="/journey/mailInBallot"
              :checked="isUserRequestedBallot()"
            />
          </cv-column>
          <cv-column :lg="5" :sm="2">
            <nav-card
              title="Get Informed"
              image-src="vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg"
              to="/journey/getInformed"
            />
          </cv-column>
          <cv-column :lg="0" :sm="2">
            <nav-card
              title="Vote"
              image-src="black-woman.png"
              image-class="-scale-x-100 object-[0_20%]"
              to="/journey/voteInPerson"
            />
          </cv-column>
        </cv-row>
        <cv-row>
          <cv-column :lg="2" />
          <cv-column :lg="5" :sm="0">
            <nav-card
              title="Vote"
              image-src="black-woman.png"
              image-class="-scale-x-100 object-[0_20%]"
              to="/journey/voteInPerson"
            />
          </cv-column>
          <cv-column :lg="5" :sm="2">
            <nav-card
              title="Deliver your ballot"
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

<script setup>
import { isUserRegistered, isUserRequestedBallot } from "~/composables/user";

const user = useUser();
onMounted(() => {
  loadApproxLocation();
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
</style>
