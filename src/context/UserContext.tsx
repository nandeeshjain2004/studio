'use client';

import { useToast } from '@/hooks/use-toast';
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserProfile = {
  name: string;
  role: 'Judge' | 'Advocate';
  avatarSeed: string;
  fallback: string;
  status: 'Active' | 'Inactive';
};

export const profiles: UserProfile[] = [
    { name: 'Judge Manan', role: 'Judge', avatarSeed: 'user-manan', fallback: 'JM', status: 'Active' },
    { name: 'Judge Nandeesh', role: 'Judge', avatarSeed: 'user-nandeesh', fallback: 'JN', status: 'Active' },
    { name: 'Advocate Chaitanya', role: 'Advocate', avatarSeed: 'user-chaitanya', fallback: 'AC', status: 'Active' },
    { name: 'Advocate Saurabh', role: 'Advocate', avatarSeed: 'user-saurabh', fallback: 'AS', status: 'Active' },
    { name: 'Advocate Rijul', role: 'Advocate', avatarSeed: 'user-rijul', fallback: 'AR', status: 'Active' },
];

const defaultUser = profiles[0];

interface UserContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  resetUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const { toast } = useToast();

  const resetUser = () => {
    setUser(defaultUser);
    toast({
        title: 'Logged Out',
        description: `You have been logged out and returned to the default profile.`,
    });
  }

  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
