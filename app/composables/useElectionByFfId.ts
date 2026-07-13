import type { MaybeRef } from "vue";
import { toValue } from "vue";

export const useElectionByFfId = async (id: MaybeRef<string>) => {
  const { data: election, status: electionStatus } = await useAsyncData(
    () => `election-${toValue(id)}`,
    () =>
      queryCollection("elections")
        .where("fiveFifthsId", "=", toValue(id))
        .first(),
    { watch: [() => toValue(id)] },
  );

  return { election, electionStatus };
};
