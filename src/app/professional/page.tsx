import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Scale, FileText, Bot, FileSignature } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Cases Managed", value: "1,250", icon: Scale },
    { title: "Documents Digitized", value: "8,420", icon: FileText },
    { title: "AI Assists", value: "3,109", icon: Bot },
    { title: "Drafts Generated", value: "480", icon: FileSignature },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Welcome, Judge Doe</h1>
        <p className="text-muted-foreground mt-2">
          Here's an overview of your activity on the NyayaAI platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="transform transition-transform duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Recent activities will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
