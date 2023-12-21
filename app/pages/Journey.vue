<template>
  <div class="voter-journey">
    <div>
      {{ $t("journeyPageRegisteredLabel") }}
      <img src="@/assets/images/black-woman-vertical.png" />
    </div>
    <div>
      {{ $t("journeyPageBallotLabel") }}
      <img
        src="@/assets/images/absentee-page-group-friends-laptop-image-1.jpg"
      />
    </div>
    <div>
      {{ $t("journeyPageGetInformedLabel") }}
      <img
        src="@/assets/images/vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg"
      />
    </div>
    <div>
      {{ $t("journeyPageVoteNowLabel") }}
      <img src="@/assets/images/holder-atlanta-map.png" />
    </div>
    <div>
      {{ $t("journeyPageDeliverLabel") }}
      <img src="@/assets/images/ballot-return-image-1.jpg" />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "JourneyPage",
});
</script>

<style scoped lang="scss">
.voter-journey {
  img {
    max-width: 100px;
  }
}
</style>
