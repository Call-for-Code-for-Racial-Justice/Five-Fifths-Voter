import { z } from "@nuxt/content";

export const contentProcedureSchema = z.object({
  region_code: z.string(),
  region: z.string(),
  early_voting: z.object({
    available: z.boolean(),
    id_needed: z.boolean(),
    more_link: z.string(),
  }),
  register: z.object({
    election_day: z.boolean(),
    online: z.boolean(),
    under18: z.boolean(),
    under18key: z.string().default("yes"),
    formerlyIncarcerated: z.boolean(),
    mail_link: z.string().url(),
    online_link: z.string().url(),
    change_party_link: z.string().url(),
    check_link: z.string().url(),
    more_link: z.string().url(),
  }),
  mail_in: z.object({
    any_reason: z.boolean(),
    without_notary: z.boolean(),
    id_needed: z.boolean(),
    dropoff: z.boolean(),
    dropoff_link: z.string().url(),
    id_explainer: z.string(),
    id_link: z.string().url(),
    request_link: z.string().url(),
    track_link: z.string().url(),
    more_link: z.string().url(),
  }),
});

export type ContentProcedure = z.infer<typeof contentProcedureSchema>;
