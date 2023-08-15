<template>
  <div v-html="mdContent"></div>
</template>

<script>
/**
 * Render the content propery using markdown-it
 */
const MarkdownIt = require('markdown-it');
export default {
  name: 'MarkDown',
  props: {
    content: { type: String, default: '' },
  },
  data: function () {
    return {
      mdContent: '',
      md: new MarkdownIt(),
    };
  },
  watch: {
    content() {
      this.updateMarkDown();
    },
  },
  created() {
    const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
    const defaultLinkOpen = this.md.renderer.rules.link_open || proxy;
    this.md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      // Make your changes here ...
      tokens[idx].attrJoin('target', '_blank');
      return defaultLinkOpen(tokens, idx, options, env, self);
    };
    this.updateMarkDown();
  },
  methods: {
    updateMarkDown() {
      this.mdContent = this.md.render(this.content);
    },
  },
};
</script>

<style lang="scss"></style>
