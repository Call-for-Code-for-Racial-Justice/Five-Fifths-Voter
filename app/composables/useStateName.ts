// useStateName.ts
import type { ComputedRef } from "vue";
import { computed } from "vue";

export type StateAbbreviation = keyof typeof STATE_ABBR_TO_NAME;

const STATE_ABBR_TO_NAME = {
  AL: "alabama",
  AK: "alaska",
  AZ: "arizona",
  AR: "arkansas",
  CA: "california",
  CO: "colorado",
  CT: "connecticut",
  DE: "delaware",
  FL: "florida",
  GA: "georgia",
  HI: "hawaii",
  ID: "idaho",
  IL: "illinois",
  IN: "indiana",
  IA: "iowa",
  KS: "kansas",
  KY: "kentucky",
  LA: "louisiana",
  ME: "maine",
  MD: "maryland",
  MA: "massachusetts",
  MI: "michigan",
  MN: "minnesota",
  MS: "mississippi",
  MO: "missouri",
  MT: "montana",
  NE: "nebraska",
  NV: "nevada",
  NH: "new-hampshire",
  NJ: "new-jersey",
  NM: "new-mexico",
  NY: "new-york",
  NC: "north-carolina",
  ND: "north-dakota",
  OH: "ohio",
  OK: "oklahoma",
  OR: "oregon",
  PA: "pennsylvania",
  RI: "rhode-island",
  SC: "south-carolina",
  SD: "south-dakota",
  TN: "tennessee",
  TX: "texas",
  UT: "utah",
  VT: "vermont",
  VA: "virginia",
  WA: "washington",
  WV: "west-virginia",
  WI: "wisconsin",
  WY: "wyoming",
  DC: "district-of-columbia",
} as const;

type MaybeRef<T> = T | { value: T };

function normalizeAbbr(value: unknown): string {
  if (value == null) return "";
  return String(value).trim().toUpperCase();
}

export function useStateName() {
  const getStateName = (abbr: unknown): string | null => {
    const key = normalizeAbbr(abbr) as StateAbbreviation;
    return STATE_ABBR_TO_NAME[key] ?? null;
  };

  const isValidStateAbbr = (abbr: unknown): abbr is StateAbbreviation => {
    const key = normalizeAbbr(abbr);
    return key in STATE_ABBR_TO_NAME;
  };

  const stateNameOf = (
    abbr: MaybeRef<unknown>,
  ): ComputedRef<string | null> =>
    computed(() =>
      getStateName(
        typeof abbr === "object" && abbr !== null && "value" in abbr ? abbr.value : abbr,
      ),
    );

  return {
    getStateName,
    isValidStateAbbr,
    stateNameOf,
  };
}
