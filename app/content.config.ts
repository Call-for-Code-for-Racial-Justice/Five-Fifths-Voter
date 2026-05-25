import { defineCollection, defineContentConfig } from "@nuxt/content";
import { contentProcedureSchema } from "./types/procedure";
import { contentElectionSchema } from "./types/election";
import { contentCandidateSchema } from "./types/candidate";

export default defineContentConfig({
  collections: {
    procedures: defineCollection({
      type: "data",
      source: "procedures/**.yml",
      schema: contentProcedureSchema,
    }),
    elections: defineCollection({
      type: "data",
      source: "elections/**/*.yml",
      schema: contentElectionSchema,
    }),
    candidates: defineCollection({
      type: "data",
      source: "candidates/**/*.@(yml|yaml)",
      schema: contentCandidateSchema,
    }),
  },
});
