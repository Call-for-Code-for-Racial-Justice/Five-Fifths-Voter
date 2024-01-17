<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const title = "five/fifths voter";
const description =
  "5/5 equals a whole. A whole person, a whole community, a whole nation. Our platform provides a personalized experience with useful tools to help marginalized voters overcome voting process roadblocks.";
const imageUrl = "/images/five-fifths-voter.jpg";
useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  twitterCard: "summary_large_image",
  twitterDescription: description,
  twitterTitle: title,
});
</script>
