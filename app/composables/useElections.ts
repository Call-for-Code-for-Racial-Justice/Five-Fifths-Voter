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
        return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },
    },
  );

  return {
    elections: data,
    status,
    refresh,
  };
};
