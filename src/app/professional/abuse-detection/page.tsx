import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbuseDetectionForm } from "./_components/abuse-detection-form";

export default function AbuseDetectionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Abuse Detection</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Flag potential abuse of provisions (e.g., repeat filings, bail abuse) using AI-based pattern recognition. This tool helps ensure the integrity of legal processes.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Analyze for Potential Abuse</CardTitle>
          <CardDescription>
            Provide case details and defendant history to let the AI analyze patterns and flag potential misuse of legal provisions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AbuseDetectionForm />
        </CardContent>
      </Card>
    </div>
  );
}
