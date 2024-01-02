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

callOnce(async () => {
  const user = useState("user");
  try {
    const localString = localStorage.getItem("user");
    if (localString) {
      user.value.info = JSON.parse(localString);
      user.value.info.fromCache = true;
    }
  } catch (e) {
    console.warn("loadInfo", e);
  }
  if (!user.value.info.location) {
    const { pending, data } = await useLazyFetch("https://ipapi.co/json/");
    // sample data
    // {
    //     "ip": "10.x.x.x",
    //     "network": "10.x.x.0/23",
    //     "version": "IPv4",
    //     "city": "Liberty",
    //     "region": "South Carolina",
    //     "region_code": "SC",
    //     "country": "US",
    //     "country_name": "United States",
    //     "country_code": "US",
    //     "country_code_iso3": "USA",
    //     "country_capital": "Washington",
    //     "country_tld": ".us",
    //     "continent_code": "NA",
    //     "in_eu": false,
    //     "postal": "29657",
    //     "latitude": 34.7846,
    //     "longitude": -82.6942,
    //     "timezone": "America/New_York",
    //     "utc_offset": "-0400",
    //     "country_calling_code": "+1",
    //     "currency": "USD",
    //     "currency_name": "Dollar",
    //     "languages": "en-US,es-US,haw,fr",
    //     "country_area": 9629091.0,
    //     "country_population": 327167434,
    //     "asn": "AS20115",
    //     "org": "CHARTER-20115"
    // }
    watch(data, (newData) => {
      if (newData.region !== user.value.info?.location?.region) {
        user.value.info.location = newData;
        user.value.info.source = "ipapi";
        localStorage.setItem("user", JSON.stringify(user.value.info));
      }
    });
  }
});
</script>
