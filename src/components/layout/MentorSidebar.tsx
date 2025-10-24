import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  MessageSquare,
  BarChart3,
  BookOpen,
  Settings,
  LogOut,
  Wallet,
  Video,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth';

const navigationItems = [
  {
    title: 'Overview',
    url: '/mentor',
    icon: LayoutDashboard,
  },
  {
    title: 'Mentees',
    url: '/mentor/mentees',
    icon: Users,
  },
  {
    title: 'Tasks & Reviews',
    url: '/mentor/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Sessions',
    url: '/mentor/sessions',
    icon: Calendar,
  },
  {
    title: 'Messages',
    url: '/mentor/messages',
    icon: MessageSquare,
  },
  {
    title: 'Analytics',
    url: '/mentor/analytics',
    icon: BarChart3,
  },
  {
    title: 'Resources',
    url: '/mentor/resources',
    icon: BookOpen,
  },
  {
    title: 'Earnings',
    url: '/mentor/earnings',
    icon: Wallet,
  },
  {
    title: 'Instagram Creator',
    url: '/mentor/instagram',
    icon: Video,
    badge: 'BETA',
  },
  {
    title: 'Settings',
    url: '/mentor/settings',
    icon: Settings,
  },
];

export function MentorSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { logout } = useAuthStore();

  const isActive = (path: string) => {
    if (path === '/mentor') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "w-full justify-start gap-3 h-11";
    if (isActive(path)) {
      return `${baseClasses} bg-sidebar-accent text-sidebar-accent-foreground font-medium`;
    }
    return `${baseClasses} text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`;
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-white flex items-center justify-center">
              <div className="text-primary font-bold text-sm">ND</div>
            </div>
            {!collapsed && (
              <div>
                <div className="text-sidebar-foreground font-semibold text-sm">
                  NextDoc UK
                </div>
                <div className="text-sidebar-foreground/70 text-xs">
                  Mentor Portal
                </div>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium px-6">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.badge && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0 h-4 bg-warning/10 text-warning border-warning/20">
                              {item.badge}
                            </Badge>
                          )}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <SidebarMenuButton 
            onClick={logout}
            className="w-full justify-start gap-3 h-11 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign Out</span>}
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}