<script setup lang="ts">
/* The route for candidate scores is simplified to
 * /journey/election/five-fifths-details/:electionId/:raceId/:candidateId
 */
definePageMeta({
  middleware: (to) => {
    return navigateTo(`/journey/election/five-fifths-details/${to.params.electionId}/${to.params.raceId}/${to.params.candidateId}`, { redirectCode: 301 });
  },
});
</script>
