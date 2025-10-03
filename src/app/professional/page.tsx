'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, Clock, UserX, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from "@/context/UserContext";
import { Gavel } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();

  const stats = [
    { 
      title: "Total Pending Cases", 
      value: "~5.3 Crore", 
      icon: Briefcase,
      description: "All Courts (District, High, Supreme)",
    },
    { 
      title: "Supreme Court Pendency", 
      value: "~88,417", 
      icon: Gavel,
      description: "Total backlog as of Sep 2025",
    },
    { 
      title: "Judicial Vacancies (High Courts)", 
      value: "327", 
      icon: UserX,
      description: "Against a strength of 1,114 (Apr 2024)",
    },
    { 
      title: "Top Reason for Delay", 
      value: "Counsel Not Available", 
      icon: AlertCircle,
      description: "Cited in over 66 Lakh cases",
    },
  ];

  const recentActivities = [
    { case: "Civil Appeal No. 4821/2023", activity: "AI-drafted notice issued.", user: "Advocate Chaitanya" },
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
