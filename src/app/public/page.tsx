import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, FileText } from "lucide-react";

const caseHistory = [
    { status: 'Case Filed', date: '2023-01-15', description: 'Initial petition filed by the plaintiff.', icon: FileText },
    { status: 'First Hearing', date: '2023-02-20', description: 'Both parties present. Court orders submission of documents.', icon: Calendar },
    { status: 'Evidence Submission', date: '2023-04-10', description: 'Plaintiff and defendant submitted evidence documents.', icon: FileText },
    { status: 'Arguments Heard', date: '2023-05-25', description: 'Oral arguments presented by counsels.', icon: Calendar },
    { status: 'Judgment Reserved', date: '2023-06-05', description: 'The court has reserved the judgment.', icon: FileText },
    { status: 'Next Hearing Date', date: '2024-08-12', description: 'Final judgment expected to be pronounced.', icon: Calendar },
  ];

export default function PublicCaseTrackingPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Track Your Case</h1>
        <p className="mt-2 text-muted-foreground">Enter your Case Number (CNR) to get real-time updates.</p>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
            <div className="flex w-full items-center space-x-2">
                <Input type="text" placeholder="e.g., MHHC010000012023" className="text-base" />
                <Button type="submit" size="icon" aria-label="Search Case">
                    <Search className="h-5 w-5" />
                </Button>
            </div>
        </CardContent>
      </Card>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-2">Case Status: <span className="text-primary">DLHC01-001234-2023</span></h2>
        <p className="text-muted-foreground mb-6">Showing a sample case timeline. Search for your case to see live updates.</p>

        <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-border">
          {caseHistory.map((item, index) => (
            <div key={index} className="relative mb-8">
              <div className="absolute -left-[35px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <item.icon className="h-4 w-4" />
              </div>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{item.status}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
