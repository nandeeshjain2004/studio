'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'cnr',
    title: 'CNR Number',
    description: 'Track your case using the unique Case Number Record (CNR).',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=home/index',
  },
  {
    id: 'case-status',
    title: 'Case Status',
    description: 'Check the current status of your ongoing case.',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index',
  },
  {
    id: 'court-orders',
    title: 'Court Orders',
    description: 'Access and view orders passed by the court.',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=courtorder/index',
  },
  {
    id: 'cause-list',
    title: 'Cause List',
    description: 'View the list of cases scheduled for hearing.',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=cause_list/index',
  },
  {
    id: 'caveat-search',
    title: 'Caveat Search',
    description: 'Search for caveats filed in the court.',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=caveat_search/index',
  },
  {
    id: 'location',
    title: 'eCourt Location',
    description: 'Find the location of different eCourts.',
    url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=location/index',
  },
];

export default function TrackACasePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">eCourts Services</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Access various eCourts services directly. Clicking a service will take you to the official eCourts portal.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(service => (
          <Link href={service.url} key={service.id} className="block h-full">
            <Card className="flex h-full transform flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex-1">
                <CardTitle className="flex items-center justify-between">
                  {service.title}
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
