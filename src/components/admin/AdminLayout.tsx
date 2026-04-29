import { ReactNode } from 'react';
import { LayoutDashboard, Users, Mail, BookOpen, ImageIcon, ExternalLink, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Users & Roles', url: '/admin/users', icon: Users },
  { title: 'Enquiries', url: '/admin/enquiries', icon: Mail },
  { title: 'Programs', url: '/admin/programs', icon: BookOpen },
  { title: 'Media', url: '/admin/media', icon: ImageIcon },
];

function AdminSidebar() {
  const { signOut, user, isAdmin } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="bg-primary text-primary-foreground">
        <div className="p-4 border-b border-primary-foreground/10">
          {!collapsed && (
            <h2 className="font-display text-lg font-bold text-accent">Admin Panel</h2>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/50 text-xs uppercase tracking-wider">
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/admin'}
                      className="text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      activeClassName="bg-primary-foreground/15 text-accent font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 space-y-2 border-t border-primary-foreground/10">
          {!collapsed && (
            <p className="text-xs text-primary-foreground/50 truncate">{user?.email}</p>
          )}
          {!collapsed && (
            <span className="inline-block text-2xs px-2 py-0.5 rounded bg-accent/20 text-accent font-medium">
              {isAdmin ? 'Admin' : 'Moderator'}
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            {!collapsed && 'View Site'}
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-primary-foreground/60 hover:text-destructive text-sm w-full"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && 'Sign Out'}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-display text-lg font-semibold text-foreground">Passport Capital Admin</h1>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
