import type { Component } from "vue";

export interface FAQ {
  question: string
  answer: string
  link?: string
  icon?: Component
}
