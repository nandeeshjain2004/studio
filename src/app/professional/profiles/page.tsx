import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const profiles = [
    { name: 'Judge Manan', role: 'Judge', avatarSeed: 'user-manan', fallback: 'JM', status: 'Active' },
    { name: 'Judge Nandeesh', role: 'Judge', avatarSeed: 'user-nandeesh', fallback: 'JN', status: 'Active' },
    { name: 'Advocate Chaitanya', role: 'Advocate', avatarSeed: 'user-chaitanya', fallback: 'AC', status: 'Active' },
    { name: 'Advocate Saurabh', role: 'Advocate', avatarSeed: 'user-saurabh', fallback: 'AS', status: 'Active' },
];

export default function ProfilesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">User Profiles</h1>
                <p className="text-muted-foreground mt-2 max-w-3xl">
                    Manage and view the profiles of all professional users in the system.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Professional Users</CardTitle>
                    <CardDescription>
                        A list of all judges and advocates with access to the professional portal.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {profiles.map((profile) => (
                                <TableRow key={profile.name}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={`https://picsum.photos/seed/${profile.avatarSeed}/40/40`} data-ai-hint="person judicial" />
                                                <AvatarFallback>{profile.fallback}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{profile.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{profile.role}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={profile.status === 'Active' ? 'default' : 'secondary'}>{profile.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
