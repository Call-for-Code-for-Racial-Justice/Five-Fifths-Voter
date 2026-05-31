<script setup lang="ts">
import { Download, Info, MessageSquare } from "lucide-vue-next";

const promptUrl = "/data/ClaudePrompt.md";
const slackUrl = "https://callforcode.slack.com/archives/C01CDLTU015";
</script>

<template>
  <div class="card bg-base-300 text-base shadow-sm dark:border-l dark:border-secondary">
    <div class="card-body py-3 px-4">
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <div class="flex items-center gap-1.5 font-medium">
          <Info class="w-4 h-4"/>
          Contribute a scorecard:
        </div>

        <div class="flex items-center gap-3">
          <a
              :href="promptUrl"
              download="ClaudePrompt.md"
              class="link link-primary flex items-center gap-1"
          >
            <Download class="w-3.5 h-3.5"/>
            Download prompt
          </a>

          <div class="w-px h-3 bg-base-300 hidden sm:block"/>

          <a
              :href="slackUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-primary flex items-center gap-1"
          >
            <MessageSquare class="w-3.5 h-3.5"/>
            Share on Slack (#racial-justice-five-fifths-voter)
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
