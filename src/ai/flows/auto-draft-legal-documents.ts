'use server';

/**
 * @fileOverview A flow for auto-generating legal documents in regional formats.
 *
 * - autoDraftLegalDocument - A function that handles the auto-drafting of legal documents.
 * - AutoDraftLegalDocumentInput - The input type for the autoDraftLegalDocument function.
 * - AutoDraftLegalDocumentOutput - The return type for the autoDraftLegalDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoDraftLegalDocumentInputSchema = z.object({
  caseDetails: z
    .string()
    .describe('The details of the case, including parties, dates, and facts.'),
  documentType: z
    .string()
    .describe(
      'The type of legal document to generate (e.g., notice, filing).'
    ),
  regionalFormat: z
    .string()
    .describe('The regional format for the document (e.g., Hindi, Tamil).'),
  relevantLaws: z
    .string()
    .optional()
    .describe('Any relevant laws or precedents applicable to the case.'),
});
export type AutoDraftLegalDocumentInput = z.infer<
  typeof AutoDraftLegalDocumentInputSchema
>;

const AutoDraftLegalDocumentOutputSchema = z.object({
  documentText: z
    .string()
    .describe('The generated legal document in the specified format.'),
  consistencyCheck: z
    .string()
    .describe(
      'A report on the consistency of the generated document with existing precedents.'
    ),
});
export type AutoDraftLegalDocumentOutput = z.infer<
  typeof AutoDraftLegalDocumentOutputSchema
>;

export async function autoDraftLegalDocument(
  input: AutoDraftLegalDocumentInput
): Promise<AutoDraftLegalDocumentOutput> {
  return autoDraftLegalDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoDraftLegalDocumentPrompt',
  input: {schema: AutoDraftLegalDocumentInputSchema},
  output: {schema: AutoDraftLegalDocumentOutputSchema},
  prompt: `You are an AI legal assistant that helps lawyers auto-generate legal documents.

You will use the case details, document type, and regional format to generate the legal document.

Consider relevant laws and precedents if provided.

Case Details: {{{caseDetails}}}
Document Type: {{{documentType}}}
Regional Format: {{{regionalFormat}}}
Relevant Laws: {{{relevantLaws}}}

Generate the legal document and provide a consistency check report.

Document Text:
Consistency Check:
`,
});

const autoDraftLegalDocumentFlow = ai.defineFlow(
  {
    name: 'autoDraftLegalDocumentFlow',
    inputSchema: AutoDraftLegalDocumentInputSchema,
    outputSchema: AutoDraftLegalDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
