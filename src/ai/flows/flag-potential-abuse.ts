'use server';

/**
 * @fileOverview An AI agent for flagging potential abuse of legal provisions.
 *
 * - flagPotentialAbuse - A function that handles the flagging process.
 * - FlagPotentialAbuseInput - The input type for the flagPotentialAbuse function.
 * - FlagPotentialAbuseOutput - The return type for the flagPotentialAbuse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagPotentialAbuseInputSchema = z.object({
  caseDetails: z
    .string()
    .describe('Detailed information about the current case.'),
  defendantHistory: z
    .string()
    .describe('The defendant’s history of legal filings and bail status.'),
  relevantProvisions: z
    .string()
    .describe(
      'The legal provisions relevant to the current case (e.g., sections of law).' 
    ),
});
export type FlagPotentialAbuseInput = z.infer<typeof FlagPotentialAbuseInputSchema>;

const FlagPotentialAbuseOutputSchema = z.object({
  abuseDetected: z
    .boolean()
    .describe('Whether or not potential abuse of legal provisions is detected.'),
  explanation: z
    .string()
    .describe(
      'An explanation of why abuse is suspected, including specific details from the case and defendant history.'
    ),
});
export type FlagPotentialAbuseOutput = z.infer<typeof FlagPotentialAbuseOutputSchema>;

export async function flagPotentialAbuse(
  input: FlagPotentialAbuseInput
): Promise<FlagPotentialAbuseOutput> {
  return flagPotentialAbuseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagPotentialAbusePrompt',
  input: {schema: FlagPotentialAbuseInputSchema},
  output: {schema: FlagPotentialAbuseOutputSchema},
  prompt: `You are an expert legal analyst tasked with identifying potential abuse of legal provisions.

  Review the provided case details, defendant history, and relevant legal provisions to determine if there is a potential abuse, such as repeat filings or bail abuse.

  Provide a clear explanation for your determination, referencing specific details from the case and the defendant's history.

  Case Details: {{{caseDetails}}}
  Defendant History: {{{defendantHistory}}}
  Relevant Provisions: {{{relevantProvisions}}}`,
});

const flagPotentialAbuseFlow = ai.defineFlow(
  {
    name: 'flagPotentialAbuseFlow',
    inputSchema: FlagPotentialAbuseInputSchema,
    outputSchema: FlagPotentialAbuseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
