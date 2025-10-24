import { ReactNode } from 'react';
import { useAuthStore } from '@/store/auth';
import { Lock, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RoleGuardProps {
  children: ReactNode;
  requiredRole: 'mentor' | 'mentee' | 'admin';
  fallback?: ReactNode;
}

export function RoleGuard({ children, requiredRole, fallback }: RoleGuardProps) {
  const { user, isAuthenticated, setRole } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <ShieldAlert className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to access the NextDoc UK Mentor Dashboard.
          </p>
          <Button 
            onClick={() => setRole('mentor')}
            className="w-full"
          >
            Continue as Mentor
          </Button>
        </Card>
      </div>
    );
  }

  if (user.role !== requiredRole) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <Lock className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Restricted</h1>
          <p className="text-muted-foreground mb-4">
            You need mentor privileges to access this area.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Current role: <span className="font-medium capitalize">{user.role || 'None'}</span>
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => setRole('mentor')}
              className="w-full"
            >
              Switch to Mentor Role
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setRole(null)}
              className="w-full"
            >
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}