import type { ContentElections } from "~/types/election";
import type { CivicElectionsResponse } from "~/types/civic";

export interface UnifiedElection {
  id: string
  name: string
  date: string
  ocdId: string
  source: "content" | "api"
  originalData: ContentElections | CivicElectionsResponse
}

export const useElections = async () => {
  const usaState = useLocalStorage(LOCAL_STORAGE_KEYS.USA_STATE, "");

  const { data, status, refresh } = await useAsyncData(
    `elections-combined-${usaState.value}`,
    async () => {
      if (!usaState.value) return [];
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const sevenDaysAgoIso = sevenDaysAgo.toISOString().split("T")[0];

      const [contentData, apiData] = await Promise.all([
        queryCollection("elections")
          .where("ocdId", "=", `ocd-division/country:us/state:${usaState.value.toLowerCase()}`)
          .where("date", ">=", sevenDaysAgoIso)
          .all(),
        $fetch<CivicElectionsResponse>("/api/elections").catch(() => ({ elections: [] })),
      ]);

      const unified: UnifiedElection[] = [];

      // Add content elections
      if (Array.isArray(contentData)) {
        contentData.forEach((e: ContentElections) => {
          unified.push({
            id: e.meta.fiveFifthsId || e.id || e.stem,
            name: e.title || e.description,
            date: e.date,
            ocdId: e.ocdId,
            source: "content",
            originalData: e,
          });
        });
      }

      // Add API elections
      if (apiData?.elections) {
        apiData.elections.forEach((e) => {
          unified.push({
            id: e.id,
            name: e.name,
            date: e.electionDay,
            ocdId: e.ocdDivisionId,
            source: "api",
            originalData: e,
          });
        });
      }

      return unified;
    },
    {
      watch: [usaState],
      transform: (data) => {
        if (!usaState.value) return data;

        const stateLower = usaState.value.toLowerCase();

        return data.sort((a, b) => {
          // Check if ocdId matches the state
          const aMatchesState = a.ocdId.includes(`state:${stateLower}`);
          const bMatchesState = b.ocdId.includes(`state:${stateLower}`);

          // Check if the source field is "content"
          const aIsContent = a.source === "content";
          const bIsContent = b.source === "content";

          // Check if ocdId is a country-level division (no state)
          const aIsCountryOnly = a.ocdId === "ocd-division/country:us";
          const bIsCountryOnly = b.ocdId === "ocd-division/country:us";

          // Priority order:
          // 1. Matches state AND is content
          // 2. Matches state AND is API
          // 3. Is country-level (no state)
          // 4. Everything else

          if (aMatchesState && bMatchesState) {
            // they both match state - content comes first
            if (aIsContent && !bIsContent) return -1;
            if (!aIsContent && bIsContent) return 1;
            // Both same value for source - sort by date
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }

          if (aMatchesState && !bMatchesState) return -1;
          if (!aMatchesState && bMatchesState) return 1;

          if (aIsCountryOnly && !bIsCountryOnly) return -1;
          if (!aIsCountryOnly && bIsCountryOnly) return 1;

          // Everything else - sort by date
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      },
    },
  );

  return {
    elections: data,
    status,
    refresh,
  };
};
