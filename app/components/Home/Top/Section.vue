<template>
  <section id="top" class="mt-[2rem] h-dvh w-full">
    <div
      class="h-[calc(100%-320px-2rem)] w-full bg-ff-purple-01
        bg-[url(@/assets/images/silhouette-tile.png)] bg-cover bg-repeat-x md:bg-contain"
    >
      <div class="p-8">
        <img
          alt="Five Fifths voter"
          src="@/assets/images/five-fifths-voter.svg"
        />
      </div>
      <div class="h-full w-full p-3 text-white md:p-14">
        <line-breaks
          :content="$t('landingTopTagline')"
          class="text-4xl md:text-6xl"
        />
        <div class="pt-10 text-2xl md:max-w-96 md:pt-8 md:text-2xl">
          {{ $t("landingTopDesc") }}
        </div>
      </div>
    </div>
    <home-countdown />
  </section>
</template>

<script setup>
defineOptions({
  name: "HomeTopSection",
});
</script>

<style scoped lang="scss"></style>
