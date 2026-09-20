import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Headphones,
  FolderOpen,
  MessageSquare,
  Users,
  Mail,
  LogOut,
  Shield,
  HeadsetIcon,
  Menu,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const adminNavItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  {
    to: '/admin/consultation-desk',
    label: 'Consultation Desk',
    icon: Headphones,
    end: false,
    highlight: true,
  },
  { to: '/admin/programs', label: 'Programs', icon: FolderOpen, end: false },
  { to: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare, end: false },
  { to: '/admin/users', label: 'Users', icon: Users, end: false },
  { to: '/admin/newsletter', label: 'Newsletter', icon: Mail, end: false },
];

const consultantNavItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  {
    to: '/admin/consultation-desk',
    label: 'Consultation Desk',
    icon: Headphones,
    end: false,
    highlight: true,
  },
  { to: '/admin/enquiries', label: 'My Enquiries', icon: MessageSquare, end: false },
];

function SidebarContent({
  onNavClick,
}: {
  onNavClick?: () => void;
}) {
  const { signOut, user, isAdmin } = useAuth();
  const navItems = isAdmin ? adminNavItems : consultantNavItems;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-tight">Passport Capital</h1>
        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end, highlight }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                highlight
                  ? isActive
                    ? 'bg-amber-500/20 text-amber-300 border-l-4 border-amber-400 pl-2'
                    : 'text-gray-300 hover:bg-gray-800 border-l-4 border-amber-500/60 pl-2 hover:border-amber-400 hover:text-amber-200'
                  : isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-700">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
            {isAdmin ? (
              <Shield className="h-4 w-4 text-amber-400" />
            ) : (
              <HeadsetIcon className="h-4 w-4 text-blue-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-200 truncate">
              {user?.email}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {isAdmin ? 'Admin' : 'Consultant'}
            </p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-gray-900 px-4 text-white">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-gray-900 border-gray-700 p-0">
              <SidebarContent onNavClick={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-bold">Passport Capital</h1>
        </header>
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white flex flex-col z-50">
        <SidebarContent />
      </aside>
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
