<script setup></script>

<template>
  <PageInset>
    <PageTitle>
      {{ $t("whyVotePageTitle") }}
    </PageTitle>
    <div>
      <div class="flex">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="mb-2 text-heading-04">
            {{ $t("whyVotePageSubTitle") }}
          </div>
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
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <img
            class="side-image"
            alt=""
            src="../../assets/images/why-vote-page-father-daughter-image-1.jpg"
          >
        </div>
      </div>
    </div>
  </PageInset>
</template>
