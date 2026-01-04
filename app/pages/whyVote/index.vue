<script setup>
</script>

<template>
  <div>
    <PageTitle>
      {{ $t("whyVotePageTitle") }}
    </PageTitle>
    <div class="flex items-center justify-center p-4">
      <div class="card bg-base-200 card-lg md:max-w-1/2 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">{{ $t("whyVotePageSubTitle") }}</h2>
          <p class="aside__paragraph">
            {{ $t("whyVotePageParagraph_1") }}
            <br><br>
            {{ $t("whyVotePageParagraph_2") }}
            <br><br>
            {{ $t("whyVotePageParagraph_3", ["Five Fifths Voter"]) }}
            <br><br>
            <MarkDown :content="$t('whyVotePageQuote')" />
          </p>
        </div>
        <figure>
          <img
              src="../../assets/images/why-vote-page-father-daughter-image-1.jpg"
              alt="" >
        </figure>
      </div>
    </div>
  </div>

<!--  <PageInset>-->
<!--    <PageTitle>-->
<!--      {{ $t("whyVotePageTitle") }}-->
<!--    </PageTitle>-->
<!--    <div>-->
<!--      <div class="flex">-->
<!--        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">-->
<!--          <div class="mb-2 text-heading-04">-->
<!--            {{ $t("whyVotePageSubTitle") }}-->
<!--          </div>-->

<!--        </div>-->
<!--        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">-->
<!--          <img-->
<!--            class="side-image"-->
<!--            alt=""-->
<!--            src="../../assets/images/why-vote-page-father-daughter-image-1.jpg"-->
<!--          >-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </PageInset>-->
</template>
