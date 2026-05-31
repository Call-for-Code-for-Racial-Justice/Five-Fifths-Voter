import type { ContentCandidate } from "~/types/candidate";
import type { ContentSectionItem, ContentSection } from "~/types/section";

export const getAddressedIssuesCount = (candidate: ContentCandidate) => {
  if (!candidate.sections) return 0;
  return candidate.sections.reduce((acc: number, section: ContentSection) => {
    return acc + (section.items?.filter((item: ContentSectionItem) => item.coverage > 0 && item.position_tag !== null).length || 0);
  }, 0);
};

export const getTotalIssuesCount = (candidate: ContentCandidate) => {
  if (!candidate.sections) return 0;
  return candidate.sections.reduce((acc: number, section: ContentSection) => {
    return acc + (section.items?.length || 0);
  }, 0);
};
