<template>
  <div v-html="mdContent"></div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
/**
 * Render the content property using markdown-it
 */
const props = defineProps({
  content: { type: String, default: "" }
});
const mdContent = computed(() => {
  return md.render(props.content);
});
onBeforeMount(() => {
  const proxy = (tokens, idx, options, env, self) =>
    self.renderToken(tokens, idx, options);
  const defaultLinkOpen = md.renderer.rules.link_open || proxy;
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    // Make your changes here ...
    tokens[idx].attrJoin("target", "_blank");
    return defaultLinkOpen(tokens, idx, options, env, self);
  };
});
</script>

<style lang="scss"></style>
