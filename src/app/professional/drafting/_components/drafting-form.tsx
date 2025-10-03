'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { autoDraftLegalDocument, type AutoDraftLegalDocumentOutput } from '@/ai/flows/auto-draft-legal-documents';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, FileSignature, Upload, File as FileIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';


const formSchema = z.object({
  caseDetails: z.string().min(50, 'Case details must be at least 50 characters.'),
  documentType: z.string().min(1, 'Document type is required.'),
  regionalFormat: z.string().min(1, 'Regional format is required.'),
  relevantLaws: z.string().optional(),
});

export function DraftingForm() {
  const [result, setResult] = useState<AutoDraftLegalDocumentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { caseDetails: '', documentType: 'Notice', regionalFormat: 'English', relevantLaws: '' },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if(file.type.startsWith('text/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          form.setValue('caseDetails', text);
          setFileName(file.name);
        };
        reader.readAsText(file);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload a plain text file (.txt) for case details.',
        });
      }
    }
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
                  <Textarea placeholder="Enter parties, dates, facts, and other case details, or upload a text file..." className="min-h-[150px]" {...field} />
                </FormControl>
                 <div className="flex items-center gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload .txt File
                  </Button>
                  {fileName && <div className="text-sm text-muted-foreground flex items-center gap-2"><FileIcon className="h-4 w-4" /><span>{fileName}</span></div>}
                </div>
                 <Input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".txt,text/plain"
                  />
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
