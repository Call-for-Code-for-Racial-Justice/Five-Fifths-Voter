import { useUser } from "~/composables/user";

export const loadApproxLocation = async () => {
  const user = useUser();
  if (process.server || user.value?.info?.location) return;

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
    // console.log("get location from ipapi");
    const { data } = await useLazyFetch("https://ipapi.co/json/");
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
};

export const setUserRequested = (requested) => {
  const user = useState("user");
  user.value.info.location.requested_early = requested
    ? "presidential-2024"
    : "";
  localStorage.setItem("user", JSON.stringify(user.value.info));
};
