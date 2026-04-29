import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Trash2 } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface UserWithRoles {
  id: string;
  full_name: string | null;
  created_at: string;
  roles: AppRole[];
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  const fetchUsers = async () => {
    setLoading(true);
    const { data: profiles, error: profilesError } = await supabase.from('profiles').select('*');
    if (profilesError) {
      toast.error(profilesError.message);
      setLoading(false);
      return;
    }
    const { data: roles, error: rolesError } = await supabase.from('user_roles').select('*');
    if (rolesError) {
      toast.error(rolesError.message);
      setLoading(false);
      return;
    }

    const userMap = new Map<string, UserWithRoles>();
    profiles?.forEach(p => {
      userMap.set(p.id, { id: p.id, full_name: p.full_name, created_at: p.created_at, roles: [] });
    });
    roles?.forEach(r => {
      const u = userMap.get(r.user_id);
      if (u) u.roles.push(r.role);
    });

    setUsers(Array.from(userMap.values()));
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const addRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase.from('user_roles').insert({ user_id: userId, role });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Role added');
      fetchUsers();
    }
  };

  const removeRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase.from('user_roles').delete().eq('user_id', userId).eq('role', role);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Role removed');
      fetchUsers();
    }
  };

  const roleBadgeVariant = (role: AppRole) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'moderator': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Users & Role Management</h2>
        {!isAdmin && (
          <p className="text-muted-foreground text-sm">Only admins can manage roles.</p>
        )}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Joined</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.full_name || 'Unnamed'}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {u.roles.length === 0 && <span className="text-muted-foreground text-sm">No roles</span>}
                      {u.roles.map(role => (
                        <Badge key={role} variant={roleBadgeVariant(role)} className="flex items-center gap-1">
                          {role}
                          {isAdmin && (
                            <button onClick={() => removeRole(u.id, role)} className="ml-1 hover:text-destructive-foreground">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(u.created_at).toLocaleDateString()}
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(v) => addRole(u.id, v as AppRole)}>
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue placeholder="Add role" />
                          </SelectTrigger>
                          <SelectContent>
                            {(['admin', 'moderator', 'user'] as AppRole[])
                              .filter(r => !u.roles.includes(r))
                              .map(r => (
                                <SelectItem key={r} value={r}>{r}</SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
