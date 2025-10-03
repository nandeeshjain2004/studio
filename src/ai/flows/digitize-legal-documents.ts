'use server';

/**
 * @fileOverview A flow to digitize legal documents using OCR and NLP.
 *
 * - digitizeLegalDocument - A function that handles the document digitization process.
 * - DigitizeLegalDocumentInput - The input type for the digitizeLegalDocument function.
 * - DigitizeLegalDocumentOutput - The return type for the digitizeLegalDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DigitizeLegalDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A scanned legal document, including handwritten affidavits, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DigitizeLegalDocumentInput = z.infer<typeof DigitizeLegalDocumentInputSchema>;

const DigitizeLegalDocumentOutputSchema = z.object({
  digitizedText: z
    .string()
    .describe('The digitized text extracted from the legal document.'),
});
export type DigitizeLegalDocumentOutput = z.infer<typeof DigitizeLegalDocumentOutputSchema>;

export async function digitizeLegalDocument(
  input: DigitizeLegalDocumentInput
): Promise<DigitizeLegalDocumentOutput> {
  return digitizeLegalDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'digitizeLegalDocumentPrompt',
  input: {schema: DigitizeLegalDocumentInputSchema},
  output: {schema: DigitizeLegalDocumentOutputSchema},
  prompt: `You are an expert legal document digitizer.

You will use OCR and NLP to convert the scanned legal document into searchable digital text.

Scanned Document: {{media url=documentDataUri}}`,
});

const digitizeLegalDocumentFlow = ai.defineFlow(
  {
    name: 'digitizeLegalDocumentFlow',
    inputSchema: DigitizeLegalDocumentInputSchema,
    outputSchema: DigitizeLegalDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
