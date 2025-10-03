'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestRelevantCaseLaws, type SuggestRelevantCaseLawsOutput } from '@/ai/flows/suggest-relevant-case-laws';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  legalDocument: z.string().min(50, 'Legal document text must be at least 50 characters.'),
  query: z.string().min(10, 'Query must be at least 10 characters.'),
});

export function AssistantForm() {
  const [result, setResult] = useState<SuggestRelevantCaseLawsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { legalDocument: '', query: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await suggestRelevantCaseLaws(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get suggestions. Please try again.',
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
            name="legalDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Legal Document Text</FormLabel>
                <FormControl>
                  <Textarea placeholder="Paste the full text of the legal document here..." className="min-h-[200px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Query</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Bail application for Section 302 IPC'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
            Get Suggestions
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>AI Analysis in Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Searching Legal Databases</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
            </Card>
        </div>
      )}

      {result && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/> Relevant Case Laws</CardTitle>
            </CardHeader>
            <CardContent>
              {result.relevantCaseLaws.length > 0 ? (
                <ul className="space-y-2">
                  {result.relevantCaseLaws.map((law, index) => (
                    <li key={index} className="rounded-md border p-3 text-sm">{law}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No specific case laws were suggested.</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive"/> Missed Sections</CardTitle>
            </CardHeader>
            <CardContent>
            {result.missedSections.length > 0 ? (
                <ul className="space-y-2">
                  {result.missedSections.map((section, index) => (
                    <li key={index} className="rounded-md border p-3 text-sm">{section}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No missed sections were identified.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
