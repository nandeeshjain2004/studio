'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { digitizeLegalDocument, type DigitizeLegalDocumentOutput } from '@/ai/flows/digitize-legal-documents';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  documentDataUri: z.string().startsWith('data:', { message: 'Must be a valid data URI.' }).min(1, 'Data URI cannot be empty.'),
});

export function DigitizeDocumentForm() {
  const [result, setResult] = useState<DigitizeLegalDocumentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentDataUri: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await digitizeLegalDocument(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to digitize the document. Please ensure the data URI is correct and try again.',
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
            name="documentDataUri"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Data URI</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="data:image/png;base64,iVBORw0KGgo..."
                    className="min-h-[120px] font-code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Digitize Document
          </Button>
        </form>
      </Form>
      
      {isLoading && (
        <Card>
            <CardHeader>
                <CardTitle>Digitizing...</CardTitle>
                <CardDescription>The AI is processing the document. Please wait.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Digitized Text</CardTitle>
            <CardDescription>The following text has been extracted from the document.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="w-full whitespace-pre-wrap rounded-md bg-muted p-4 font-body text-sm">
              {result.digitizedText}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
