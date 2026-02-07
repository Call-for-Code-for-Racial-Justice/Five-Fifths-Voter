export interface CivicElection {
  id: string
  name: string
  electionDay: string
  ocdDivisionId: string
}

export interface CivicElectionsResponse {
  kind: string
  elections: CivicElection[]
}
