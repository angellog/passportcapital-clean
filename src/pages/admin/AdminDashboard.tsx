import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  FolderOpen,
  MessageSquare,
  Clock,
  Headphones,
  FolderPen,
  Mail,
  Users,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';

const statusColor: Record<string, string> = {
  new: 'bg-amber-100 text-amber-800 border-amber-200',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  in_progress: 'bg-green-100 text-green-800 border-green-200',
  closed_won: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  closed_lost: 'bg-red-100 text-red-800 border-red-200',
};

const pieColors = ['#f59e0b', '#eab308', '#22c55e', '#059669', '#ef4444'];

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

const AdminDashboard = () => {
  const { isAdmin } = useAuth();

  const { data: activePrograms, isLoading: lp1 } = useQuery({
    queryKey: ['admin-active-programs'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('programs')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: newEnquiries, isLoading: lp2 } = useQuery({
    queryKey: ['admin-new-enquiries'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: inProgressCount, isLoading: lp3 } = useQuery({
    queryKey: ['admin-in-progress'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'in_progress');
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: recentEnquiries, isLoading: lp4 } = useQuery({
    queryKey: ['admin-recent-enquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enquiries')
        .select('id, full_name, program_interest, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const { data: statusBreakdown = [] } = useQuery({
    queryKey: ['admin-enquiries-status-breakdown'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enquiries')
        .select('status');
      if (error) throw error;
      const counts: Record<string, number> = {};
      for (const row of data ?? []) {
        counts[row.status] = (counts[row.status] || 0) + 1;
      }
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    },
  });

  const { data: regionBreakdown = [] } = useQuery({
    queryKey: ['admin-programs-region-breakdown'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('region')
        .eq('is_active', true);
      if (error) throw error;
      const counts: Record<string, number> = {};
      for (const row of data ?? []) {
        counts[row.region] = (counts[row.region] || 0) + 1;
      }
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    },
  });

  const isLoading = lp1 || lp2 || lp3 || lp4;

  if (isLoading) return <DashboardSkeleton />;

  const stats = [
    {
      title: 'Active Programs',
      value: activePrograms ?? 0,
      icon: FolderOpen,
      accent: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'New Enquiries',
      value: newEnquiries ?? 0,
      icon: MessageSquare,
      accent: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'In Progress',
      value: inProgressCount ?? 0,
      icon: Clock,
      accent: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Consultation Desk',
      icon: Headphones,
      accent: 'text-amber-400',
      bg: 'bg-amber-400/10',
      isConsultation: true,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-md p-2 ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.accent}`} />
                </div>
              </CardHeader>
              <CardContent>
                {stat.isConsultation ? (
                  <Link to="/admin/consultation-desk">
                    <Button className="bg-amber-500 text-gray-900 hover:bg-amber-400">
                      Open Desk
                    </Button>
                  </Link>
                ) : (
                  <p className="text-2xl font-bold">{stat.value}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enquiries by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {statusBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No enquiries data yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusBreakdown.map((_, i) => (
                      <Cell
                        key={i}
                        fill={pieColors[i % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Programs by Region</CardTitle>
          </CardHeader>
          <CardContent>
            {regionBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No programs data yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={regionBreakdown}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {!recentEnquiries || recentEnquiries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No enquiries yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Program Interest</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium">
                      {enquiry.full_name || '—'}
                    </TableCell>
                    <TableCell>{enquiry.program_interest || '—'}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColor[enquiry.status] ?? statusColor.new
                        }
                      >
                        {enquiry.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        {isAdmin && (
          <Link to="/admin/programs">
            <Button variant="outline" className="gap-2">
              <FolderPen className="h-4 w-4" /> Manage Programs
            </Button>
          </Link>
        )}
        <Link to="/admin/enquiries">
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" /> View Enquiries
          </Button>
        </Link>
        <Link to="/admin/consultation-desk">
          <Button variant="outline" className="gap-2">
            <Headphones className="h-4 w-4" /> Consultation Desk
          </Button>
        </Link>
        {isAdmin && (
          <Link to="/admin/users">
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" /> Manage Users
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
