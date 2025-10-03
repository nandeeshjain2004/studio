import { config } from 'dotenv';
config();

import '@/ai/flows/digitize-legal-documents.ts';
import '@/ai/flows/suggest-relevant-case-laws.ts';
import '@/ai/flows/flag-potential-abuse.ts';
import '@/ai/flows/auto-draft-legal-documents.ts';