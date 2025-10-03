'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const services = [
  {
    id: 'cnr',
    title: 'CNR Number',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=home/index',
  },
  {
    id: 'case-status',
    title: 'Case Status',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index',
  },
  {
    id: 'court-orders',
    title: 'Court Orders',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=courtorder/index',
  },
  {
    id: 'cause-list',
    title: 'Cause List',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=cause_list/index',
  },
  {
    id: 'caveat-search',
    title: 'Caveat Search',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=caveat_search/index',
  },
  {
    id: 'location',
    title: 'Location',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=location/index',
  },
];

export default function TrackACasePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Track a Case</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Access various eCourts services directly from within the portal. Select a service below to get started.
        </p>
      </div>

      <Tabs defaultValue="cnr" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 h-auto">
          {services.map(service => (
            <TabsTrigger key={service.id} value={service.id} className="w-full">
              {service.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {services.map(service => (
          <TabsContent key={service.id} value={service.id} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full">
                  <iframe
                    src={service.url}
                    className="h-full w-full rounded-md border"
                    title={service.title}
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
