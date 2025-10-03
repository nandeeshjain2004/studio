import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DigitizeDocumentForm } from "./_components/digitize-document-form";

export default function DigitizePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Document Parsing and Digitization</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Utilize OCR and NLP to convert scanned legal documents (including handwritten affidavits) into searchable digital text. This tool extracts text from image-based documents for analysis and storage.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Digitize a Document</CardTitle>
          <CardDescription>
            Provide the document as a data URI to start the digitization process. For a real application, this would be a file upload.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DigitizeDocumentForm />
        </CardContent>
      </Card>
    </div>
  );
}
