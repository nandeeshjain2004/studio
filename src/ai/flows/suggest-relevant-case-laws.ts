'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant case laws and identifying missed sections in legal documents.
 *
 * - suggestRelevantCaseLaws - A function that suggests relevant case laws and identifies missed sections.
 * - SuggestRelevantCaseLawsInput - The input type for the suggestRelevantCaseLaws function.
 * - SuggestRelevantCaseLawsOutput - The return type for the suggestRelevantCaseLaws function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantCaseLawsInputSchema = z.object({
  legalDocument: z
    .string()
    .describe('The legal document to analyze.'),
  query: z.string().describe('The query to use to find relevant case laws.'),
});
export type SuggestRelevantCaseLawsInput = z.infer<typeof SuggestRelevantCaseLawsInputSchema>;

const SuggestRelevantCaseLawsOutputSchema = z.object({
  relevantCaseLaws: z.array(z.string()).describe('An array of relevant case laws.'),
  missedSections: z.array(z.string()).describe('An array of missed sections in the document.'),
});
export type SuggestRelevantCaseLawsOutput = z.infer<typeof SuggestRelevantCaseLawsOutputSchema>;

export async function suggestRelevantCaseLaws(input: SuggestRelevantCaseLawsInput): Promise<SuggestRelevantCaseLawsOutput> {
  return suggestRelevantCaseLawsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantCaseLawsPrompt',
  input: {schema: SuggestRelevantCaseLawsInputSchema},
  output: {schema: SuggestRelevantCaseLawsOutputSchema},
  prompt: `You are an AI Legal Assistant, tasked with helping judges by suggesting relevant case laws and identifying missed sections in legal documents.

  Given the following legal document and query, please provide relevant case laws and identify any missed sections.

  Legal Document: {{{legalDocument}}}
  Query: {{{query}}}

  Relevant Case Laws:
  Missed Sections:
  `,
});

const suggestRelevantCaseLawsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantCaseLawsFlow',
    inputSchema: SuggestRelevantCaseLawsInputSchema,
    outputSchema: SuggestRelevantCaseLawsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
