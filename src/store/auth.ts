import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'mentor' | 'mentee' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialties: string[];
  sessionsCompleted?: number;
  mentorTier?: 'Associate' | 'Senior' | 'Principal';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: '1',
        name: 'Dr. Sarah Mitchell',
        email: 'sarah.mitchell@nextdocuk.co.uk',
        role: 'mentor',
        avatar: '/avatars/mentor-sarah.jpg',
        specialties: ['Internal Medicine', 'Cardiology', 'PLAB Preparation'],
        sessionsCompleted: 42,
        mentorTier: 'Associate',
      },
      isAuthenticated: true,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setRole: (role) =>
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
        })),
    }),
    {
      name: 'nextdoc-auth',
    }
  )
);