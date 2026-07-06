<script setup lang="ts">
/* The route for candidate list is simplified to
 * /journey/election/five-fifths-details/:electionId/:raceId/
 */
definePageMeta({
  middleware: (to) => {
    return navigateTo(`/journey/election/five-fifths-details/${to.params.electionId}/${to.params.id}`, { redirectCode: 301 });
  },
});
</script>
