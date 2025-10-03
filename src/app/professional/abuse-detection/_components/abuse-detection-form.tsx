'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { flagPotentialAbuse, type FlagPotentialAbuseOutput } from '@/ai/flows/flag-potential-abuse';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert, ShieldCheck, Upload, File as FileIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  caseDetails: z.string().min(50, 'Case details must be at least 50 characters.'),
  defendantHistory: z.string().min(20, 'Defendant history must be at least 20 characters.'),
  relevantProvisions: z.string().min(10, 'Relevant provisions must be at least 10 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export function AbuseDetectionForm() {
  const [result, setResult] = useState<FlagPotentialAbuseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileNames, setFileNames] = useState({ caseDetails: '', defendantHistory: '' });
  const { toast } = useToast();
  
  const caseDetailsRef = useRef<HTMLInputElement>(null);
  const defendantHistoryRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { caseDetails: '', defendantHistory: '', relevantProvisions: '' },
  });

  const handleFileChange = (fieldName: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('text/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          form.setValue(fieldName, text);
          setFileNames(prev => ({...prev, [fieldName]: file.name }));
        };
        reader.readAsText(file);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload a plain text file (.txt).',
        });
      }
    }
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await flagPotentialAbuse(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to analyze for abuse. Please try again.',
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="caseDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Case Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the current case or upload a text file..." className="min-h-[120px]" {...field} />
                </FormControl>
                <div className="flex items-center gap-4 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => caseDetailsRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload .txt
                  </Button>
                  {fileNames.caseDetails && <div className="text-sm text-muted-foreground flex items-center gap-2"><FileIcon className="h-4 w-4" /><span>{fileNames.caseDetails}</span></div>}
                </div>
                <Input type="file" className="hidden" ref={caseDetailsRef} onChange={handleFileChange('caseDetails')} accept=".txt,text/plain" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defendantHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Defendant's Legal History</FormLabel>
                <FormControl>
                  <Textarea placeholder="Provide history of legal filings, bail status, or upload a text file..." className="min-h-[120px]" {...field} />
                </FormControl>
                <div className="flex items-center gap-4 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => defendantHistoryRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload .txt
                  </Button>
                  {fileNames.defendantHistory && <div className="text-sm text-muted-foreground flex items-center gap-2"><FileIcon className="h-4 w-4" /><span>{fileNames.defendantHistory}</span></div>}
                </div>
                <Input type="file" className="hidden" ref={defendantHistoryRef} onChange={handleFileChange('defendantHistory')} accept=".txt,text/plain" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relevantProvisions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relevant Legal Provisions</FormLabel>
                <FormControl>
                  <Textarea placeholder="List the sections of law applicable to the case." className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldAlert className="mr-2 h-4 w-4" />}
            Analyze for Abuse
          </Button>
        </form>
      </Form>

      {isLoading && (
        <Card>
            <CardHeader>
                <CardTitle>Analyzing Patterns...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </CardContent>
        </Card>
      )}

      {result && (
        <Alert variant={result.abuseDetected ? "destructive" : "default"}>
          {result.abuseDetected ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
          <AlertTitle>
            {result.abuseDetected ? 'Potential Abuse Detected' : 'No Potential Abuse Detected'}
          </AlertTitle>
          <AlertDescription>
            {result.explanation}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
