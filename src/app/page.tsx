import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Gavel, Users, Briefcase, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-5xl text-center">
        <div className="mb-12 flex flex-col items-center justify-center gap-4">
          <Gavel className="h-16 w-16 text-primary" />
          <h1 className="font-headline text-5xl font-bold tracking-tight md:text-6xl">NyayaAI</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            An intelligent legal automation platform that digitizes, analyzes, and streamlines legal workflows for a faster, more transparent judiciary.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="flex transform flex-col text-left transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <CardHeader>
              <Users className="mb-4 h-10 w-10 text-accent" />
              <CardTitle className="font-headline text-2xl">Public Access Portal</CardTitle>
              <CardDescription>Track case progress, receive updates, and understand legal proceedings with a user-friendly interface.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <div className="flex w-full items-center space-x-2">
                <Input type="text" placeholder="Search for a case or document..." />
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-auto pt-4">
                <Button asChild className="w-full">
                  <a href="https://services.ecourts.gov.in/ecourtindia_v6/" target="_blank" rel="noopener noreferrer">
                    Track a Case <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="flex transform flex-col text-left transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <CardHeader>
              <Briefcase className="mb-4 h-10 w-10 text-accent" />
              <CardTitle className="font-headline text-2xl">Professional Portal</CardTitle>
              <CardDescription>Access AI-powered tools for document analysis, case law suggestions, and automated drafting.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <div className="flex w-full items-center space-x-2">
                  <Input type="text" placeholder="Search or upload files..." />
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
              </div>
              <div className="mt-auto pt-4">
                <Button asChild className="w-full">
                  <Link href="/professional">
                    Enter Portal <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <footer className="mt-12 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NyayaAI. Towards a more efficient and transparent legal system in India.</p>
        </footer>
      </div>
    </main>
  );
}
