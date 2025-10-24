import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MentorSidebar } from './MentorSidebar';
import { MentorHeader } from './MentorHeader';
import { RoleGuard } from '@/components/auth/RoleGuard';

interface MentorLayoutProps {
  children: ReactNode;
}

export function MentorLayout({ children }: MentorLayoutProps) {
  return (
    <RoleGuard requiredRole="mentor">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-dashboard-bg">
          <MentorSidebar />
          
          <div className="flex-1 flex flex-col">
            <MentorHeader />
            
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </RoleGuard>
  );
}