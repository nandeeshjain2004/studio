import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DraftingForm } from "./_components/drafting-form";

export default function DraftingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Automated Document Drafting</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Auto-generate legal documents (e.g., notices, standard filings) in regional formats based on case specifics. The tool also checks for inconsistencies with existing precedents.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Draft a New Legal Document</CardTitle>
          <CardDescription>
            Fill in the details below to generate a draft. The AI will format it according to the selected language and check for legal consistency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DraftingForm />
        </CardContent>
      </Card>
    </div>
  );
}
