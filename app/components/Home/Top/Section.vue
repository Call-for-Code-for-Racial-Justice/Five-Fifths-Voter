<template>
  <section
    id="top"
    class="-mt-[8px] flex h-dvh w-full flex-col justify-between"
  >
    <div
      class="h-[calc(100%-320px)] w-full bg-ff-purple-01
        bg-[url(@/assets/images/silhouette-tile.png)] bg-contain bg-repeat-x
        md:h-[calc(100%-270px)] lg:h-[calc(100%-150px)] xl:h-[calc(100%-320px)]"
    >
      <div class="mt-2 w-[160px] p-8 3xl:w-[320px]">
        <img
          alt="Five Fifths voter"
          src="@/assets/images/five-fifths-voter.svg"
          class="w-full"
        >
      </div>
      <div class="w-full p-3 text-white md:p-14 lg:pt-0">
        <line-breaks
          :content="$t('landingTopTagline')"
          class="text-2xl sm:text-4xl md:text-6xl 3xl:text-9xl"
        />
        <div
          class="pt-10 sm:text-2xl md:max-w-96 md:pt-8 md:text-2xl lg:pt-1 xl:pt-16
            3xl:max-w-[75rem] 3xl:text-7xl"
        >
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
