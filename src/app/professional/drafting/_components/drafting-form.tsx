'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { autoDraftLegalDocument, type AutoDraftLegalDocumentOutput } from '@/ai/flows/auto-draft-legal-documents';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, FileSignature } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/common/FileUploader';


const formSchema = z.object({
  caseDetails: z.string().min(50, 'Case details must be at least 50 characters.'),
  documentType: z.string().min(1, 'Document type is required.'),
  regionalFormat: z.string().min(1, 'Regional format is required.'),
  relevantLaws: z.string().optional(),
});

export function DraftingForm() {
  const [result, setResult] = useState<AutoDraftLegalDocumentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { caseDetails: '', documentType: 'Notice', regionalFormat: 'English', relevantLaws: '' },
  });

  const handleFileContent = (content: string) => {
    form.setValue('caseDetails', content, { shouldValidate: true });
    toast({
        title: 'File content loaded',
        description: `Content from the file has been loaded into the "Case Details" field.`,
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await autoDraftLegalDocument(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to draft the document. Please try again.',
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="caseDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Case Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter parties, dates, facts, and other case details..." className="min-h-[150px]" {...field} />
                </FormControl>
                <FileUploader onFileRead={handleFileContent} fileType="text" />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a document type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Notice">Notice</SelectItem>
                      <SelectItem value="Filing">Filing</SelectItem>
                      <SelectItem value="Affidavit">Affidavit</SelectItem>
                      <SelectItem value="Petition">Petition</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regionalFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regional Format</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a language/format" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="relevantLaws"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relevant Laws (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Section 302 of IPC, Article 21 of the Constitution" {...field} />
                </FormControl>
                <FormDescription>Provide any specific laws or precedents to consider.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSignature className="mr-2 h-4 w-4" />}
            Generate Draft
          </Button>
        </form>
      </Form>

      {isLoading && <div className="flex justify-center p-8"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}

      {result && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Generated Document Draft</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="draft" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="draft">Document Draft</TabsTrigger>
                        <TabsTrigger value="consistency">Consistency Check</TabsTrigger>
                    </TabsList>
                    <TabsContent value="draft" className="mt-4">
                        <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm font-body">{result.documentText}</pre>
                    </TabsContent>
                    <TabsContent value="consistency" className="mt-4">
                        <div className="rounded-md bg-muted p-4 text-sm">{result.consistencyCheck}</div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
