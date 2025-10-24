import { Search, Bell, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function MentorHeader() {
  const { user } = useAuthStore();

  const getMentorBadgeColor = (tier: string | undefined) => {
    switch (tier) {
      case 'Associate':
        return 'text-primary';
      case 'Senior':
        return 'text-warning';
      case 'Principal':
        return 'text-purple-600';
      default:
        return 'text-primary';
    }
  };

  return (
    <TooltipProvider>
      <header className="h-16 bg-white border-b border-border flex items-center px-6 gap-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        
        <div className="flex items-center gap-3">
          <div className="text-xl font-bold text-primary">
            NextDoc UK
          </div>
          <Badge variant="secondary" className="text-xs">
            Mentor Dashboard
          </Badge>
        </div>
      </div>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mentees, tasks... (Press / to focus)"
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
          <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-1 text-xs">
            3
          </Badge>
        </Button>

        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground">
              {user?.specialties?.[0] || 'Mentor'}
            </div>
          </div>
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'SM'}
              </AvatarFallback>
            </Avatar>
            {user?.mentorTier && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background border-2 border-background flex items-center justify-center">
                    <Shield className={`h-3 w-3 ${getMentorBadgeColor(user.mentorTier)}`} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm font-medium">{user.mentorTier} Mentor</p>
                  <p className="text-xs text-muted-foreground">
                    {user.sessionsCompleted || 0} sessions completed
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </header>
    </TooltipProvider>
  );
}