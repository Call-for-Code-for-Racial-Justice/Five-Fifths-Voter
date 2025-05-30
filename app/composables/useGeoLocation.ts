import { LOCAL_STORAGE_KEYS } from "~/utils/constants";

export type GeoLocation = {
  ip?: string
  network?: string
  version?: string
  city?: string
  region?: string
  region_code: string | null
  country?: string
  country_name?: string
  country_code?: string
  country_code_iso3?: string
  country_capital?: string
  country_tld?: string
  continent_code?: string
  in_eu?: boolean
  postal?: string
  latitude?: number
  longitude?: number
  timezone?: string
  utc_offset?: string
  country_calling_code?: string
  currency?: string
  currency_name?: string
  languages?: string
  country_area?: number
  country_population?: number
  asn?: string
  org?: string
};

// call this in app.vue
export const useGeoLocation = async () => {
  if (import.meta.server) return;
  const usaState = useLocalStorage(LOCAL_STORAGE_KEYS.USA_STATE, "");
  const geo = useLocalStorage<GeoLocation>(LOCAL_STORAGE_KEYS.GEO_LOCATION, { region_code: null } as GeoLocation, { shallow: true });

  // fetch the location if it is not cached
  if (geo.value.region_code == null) {
    try {
      geo.value = await $fetch<GeoLocation>("https://ipapi.co/json/");
      if (geo.value.region_code && !usaState.value)
        usaState.value = geo.value.region_code.toLowerCase();
    }
    catch (err) {
      console.error(err);
    }
  }

  return geo;
};

export const useCachedGeoLocation = () => useLocalStorage<GeoLocation>("geo-location", { region_code: null }, { shallow: true });
