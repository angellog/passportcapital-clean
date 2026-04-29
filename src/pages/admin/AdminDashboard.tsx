import { useEffect, useState } from 'react';
import { Users, Mail, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, enquiries: 0, newEnquiries: 0, admins: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [profilesRes, enquiriesRes, newEnqRes, adminsRes] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('contact_enquiries').select('id', { count: 'exact', head: true }),
          supabase.from('contact_enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
          supabase.from('user_roles').select('id', { count: 'exact', head: true }).eq('role', 'admin'),
        ]);

        if (profilesRes.error) throw profilesRes.error;
        if (enquiriesRes.error) throw enquiriesRes.error;
        if (newEnqRes.error) throw newEnqRes.error;
        if (adminsRes.error) throw adminsRes.error;

        setStats({
          users: profilesRes.count || 0,
          enquiries: enquiriesRes.count || 0,
          newEnquiries: newEnqRes.count || 0,
          admins: adminsRes.count || 0,
        });
      } catch (error: any) {
        toast.error(error.message || 'Failed to load dashboard stats');
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Users', value: stats.users, icon: Users, color: 'text-primary' },
    { title: 'Total Enquiries', value: stats.enquiries, icon: Mail, color: 'text-accent' },
    { title: 'New Enquiries', value: stats.newEnquiries, icon: Mail, color: 'text-success' },
    { title: 'Admin Users', value: stats.admins, icon: ShieldCheck, color: 'text-info' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
