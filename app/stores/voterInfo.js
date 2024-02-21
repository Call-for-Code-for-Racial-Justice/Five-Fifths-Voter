export const useVoterInfoStore = defineStore("voter-info", {
  state: () => ({
    name: "",
    description: "",
    info: "",
  }),
  actions: {
    async fetch(address, electionId) {
      const info = await $fetch("/api/voterInfo", {
        query: { address: address, electionId: electionId },
      });

      this.name = "loaded";
      this.description = "working";
      this.info = info;
    },
  },
});
