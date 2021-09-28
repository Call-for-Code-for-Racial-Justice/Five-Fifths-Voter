<template>
  <div v-html="mdContent"></div>
</template>

<script>
/**
 * Render the content propery using markdown-it
 */
const markdown = require('markdown-it')();
export default {
  name: 'MarkDown',
  props: {
    content: { type: String, default: '' }
  },
  data: function() {
    return {
      mdContent: ''
    };
  },
  watch: {
    content() {
      this.updateMarkDown();
    }
  },
  created() {
    this.updateMarkDown();
  },
  methods: {
    updateMarkDown() {
      this.mdContent = markdown.render(this.content);
    }
  }
};
</script>

<style lang="scss"></style>
