import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrackCasePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Track Your Case</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Access the eCourts Services portal to get the latest information on your case status, hearing dates, and more.
        </p>
      </div>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>eCourts Services</CardTitle>
          <CardDescription>
            This is an embedded view of the official eCourts website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full">
            <iframe
              src="https://services.ecourts.gov.in/ecourtindia_v6/"
              title="eCourts Services India"
              className="h-full w-full border-0"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
