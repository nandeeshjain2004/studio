'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, Clock, Users, BarChart2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from "@/context/UserContext";

export default function Dashboard() {
  const { user } = useUser();

  const stats = [
    { 
      title: "Total Pending Cases", 
      value: "~5.3 Crore", 
      icon: Briefcase,
      description: "All Courts (Supreme, High, District)",
      interpretation: "The overall backlog in the justice system. The majority of this pendency is in the District & Subordinate Courts."
    },
    { 
      title: "Case Clearance Rate (CCR)", 
      value: ">100%", 
      icon: BarChart2,
      description: "Supreme Court (SC)",
      interpretation: "The SC is disposing of more cases than are being filed, indicating high efficiency at the highest level."
    },
    { 
      title: "Long-Term Pendency", 
      value: "~43 Lakh", 
      icon: Clock,
      description: "Cases pending over 10 years",
      interpretation: "Highlights the 'legacy backlog' challenging the right to a speedy trial, primarily in District & Subordinate Courts."
    },
    { 
      title: "Judicial Vacancies", 
      value: "~5,245", 
      icon: Users,
      description: "District & Subordinate Judiciary",
      interpretation: "High vacancy rates are a direct contributor to low disposal rates and increasing case pendency."
    },
  ];

  const recentActivities = [
    { case: "Civil Appeal No. 4821/2023", activity: "AI-drafted notice issued.", user: "Advocate Chaitanya" },
    { case: "Writ Petition (Civil) No. 102/2024", activity: "Potential filing abuse flagged.", user: "System (AI)" },
    { case: "Criminal Appeal No. 987/2022", activity: "Relevant case laws suggested.", user: "Judge Manan" },
    { case: "SLP (Crl.) No. 543/2024", activity: "Document digitization complete.", user: "System" },
    { case: "Contempt Petition No. 212/2023", activity: "Analyzed by AI assistant.", user: "Advocate Saurabh" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Welcome, {user.name}</h1>
        <p className="text-muted-foreground mt-2">
          An overview of key judicial metrics and recent platform activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>A log of recent actions performed by users and the AI on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case / Reference</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead className="text-right">User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{activity.case}</TableCell>
                    <TableCell>{activity.activity}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{activity.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
