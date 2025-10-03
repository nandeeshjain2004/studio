import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AssistantForm } from "./_components/assistant-form";

export default function AssistantPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">AI Legal Assistant</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          An Agentic AI tool that suggests relevant case laws, identifies missed sections, predicts legal timelines, and updates case information automatically for judges and lawyers.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Get Case Law Suggestions</CardTitle>
          <CardDescription>
            Provide the legal document text and a query to receive AI-powered suggestions for relevant case laws and missed sections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssistantForm />
        </CardContent>
      </Card>
    </div>
  );
}
