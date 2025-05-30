import { defineCollection, defineContentConfig } from "@nuxt/content";
import { contentProcedureSchema } from "./types/procedure";
import { contentElectionSchema } from "./types/election";

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
  },
});
