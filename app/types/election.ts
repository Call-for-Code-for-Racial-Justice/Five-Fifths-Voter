import { z } from "@nuxt/content";

export const contentElectionSchema = z.object({
  region_code: z.string(),
  ocdId: z.string(),
  date: z.date(),
  description: z.string(),
  type: z.string(),
  website: z.string(),
  guidancePhase: z.string(),
  fiveFifthsId: z.string(),
  voting: z.object({
    inPersonVotingAvailable: z.boolean(),
    mailBallotsSentAutomatically: z.boolean(),
    early: z.object({
      url: z.string().url(),
      startDate: z.date(),
      endDate: z.date(),
      varies: z.boolean(),
    }),
    byMail: z.object({
      idInstructions: z.string(),
      explainerUrl: z.string().url(),
      deadline: z.object({
        postmarkedOrReceived: z.string().nullable(),
        date: z.date(),
        ballotRequest: z.object({
          postmarkedOrReceived: z.string().nullable(),
          date: z.date(),
          description: z.string().nullable(),
        }),
      }),
    }),
    inPerson: z.object({
      idRequiredAllVoters: z.boolean(),
      idInstructions: z.string().nullable(),
      electionDay: z.object({
        opening: z.string().nullable(),
        closing: z.string().nullable(),
      }),
    }),
    candidates: z.array(z.object({ title: z.string(), url: z.string().url() })).optional(),
  }),
});

export type ContentElections = z.infer<typeof contentElectionSchema>;
