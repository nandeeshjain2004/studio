'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser, type UserProfile, profiles as allProfiles } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

export default function ProfilesPage() {
    const { user: currentUser, setUser } = useUser();
    const { toast } = useToast();

    const handleLogin = (profile: UserProfile) => {
        setUser(profile);
        toast({
            title: `Switched Profile`,
            description: `You are now logged in as ${profile.name}.`,
        });
    };

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
                        A list of all judges and advocates with access to the professional portal. Click the login button to switch to a user's profile.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allProfiles.map((profile) => (
                                <TableRow key={profile.name} className={currentUser.name === profile.name ? "bg-muted/50" : ""}>
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
                                    <TableCell>
                                        <Badge variant={profile.status === 'Active' ? 'default' : 'secondary'}>{profile.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            onClick={() => handleLogin(profile)} 
                                            disabled={currentUser.name === profile.name}
                                        >
                                            <LogIn className="mr-2 h-4 w-4" />
                                            {currentUser.name === profile.name ? "Current" : "Login"}
                                        </Button>
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
