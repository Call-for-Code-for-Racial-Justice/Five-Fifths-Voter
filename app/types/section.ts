export interface SectionItem {
  topic: string
  note?: string
  coverage: number
  position_tag: string | null
  position_type: "pos" | "neg" | "mixed" | "none"
  source: string | null
}

export interface Section {
  id: string
  title: string
  items: SectionItem[]
}
