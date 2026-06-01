import type { z } from "@nuxt/content";
import type { contentSectionItemSchema, contentSectionSchema } from "./candidate";

// @ts-expect-error z namespace is defined in @nuxt/content
export type ContentSectionItem = z.infer<typeof contentSectionItemSchema>;
// @ts-expect-error z namespace is defined in @nuxt/content
export type ContentSection = z.infer<typeof contentSectionSchema>;
