export const useElectionByFfId = async (id: string) => {
  const { data: election, status: electionStatus } = await useAsyncData(
    `election-${id}`,
    () =>
      queryCollection("elections")
        .where("fiveFifthsId", "=", id)
        .first(),
  );

  return { election, electionStatus };
};
