import { z } from "@nuxt/content";

export const contentSectionItemSchema = z.object({
  topic: z.string(),
  note: z.string().optional(),
  coverage: z.number(),
  position_tag: z.string().nullable(),
  position_type: z.enum(["pos", "neg", "mixed", "none"]),
  source: z.union([z.string(), z.array(z.number())]).nullable(),
});

export const contentSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(contentSectionItemSchema),
});

export const contentCandidateSchema = z.object({
  fiveFifthsId: z.string(),
  name: z.string(),
  state: z.string(),
  race: z.string(), // display name
  race_id: z.string(), // slug
  party: z.string(),
  primary: z.string().nullable(),
  office_sought: z.string(),
  district: z.string().nullable(),
  region: z.string(),
  incumbent: z.boolean(),
  debate_participant: z.boolean(),
  avatar_initials: z.string(),
  ballot_order: z.number(),
  issues: z.object({
    clarity: z.string(),
    sources_count: z.number(),
    sources_list: z.array(z.string()),
    last_updated: z.date(),
    callout: z.string(),
    data_note: z.string().optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })),
  }),
  sections: z.array(contentSectionSchema),
});

// @ts-expect-error z namespace is defined in @nuxt/content
export type ContentCandidate = z.infer<typeof contentCandidateSchema>;
