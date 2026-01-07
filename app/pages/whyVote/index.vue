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
</template>
