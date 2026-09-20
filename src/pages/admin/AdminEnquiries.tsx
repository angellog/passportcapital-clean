import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Eye, RefreshCw, Trash2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type EnquiryRow = Tables<'enquiries'>;

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed_won', label: 'Closed Won' },
  { value: 'closed_lost', label: 'Closed Lost' },
];

const statusColorMap: Record<string, string> = {
  new: 'bg-blue-500 text-white hover:bg-blue-500',
  contacted: 'bg-amber-500 text-white hover:bg-amber-500',
  in_progress: 'bg-green-500 text-white hover:bg-green-500',
  closed_won: 'bg-emerald-600 text-white hover:bg-emerald-600',
  closed_lost: 'bg-red-500 text-white hover:bg-red-500',
};

const statusLabelMap: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  in_progress: 'In Progress',
  closed_won: 'Closed Won',
  closed_lost: 'Closed Lost',
};

const AdminEnquiries = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [viewOpen, setViewOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<EnquiryRow | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignId, setAssignId] = useState<string | null>(null);
  const [assignTo, setAssignTo] = useState<string>('');
  const { isAdmin, user } = useAuth();

  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ['admin-enquiries'],
    queryFn: async () => {
      let query = supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!isAdmin && user?.id) {
        query = query.eq('assigned_to', user.id);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: adminUsers = [] } = useQuery({
    queryKey: ['admin-users-assign'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, name, email, role')
        .eq('is_active', true);
      if (error) throw error;
      return data as { id: string; name: string | null; email: string; role: string }[];
    },
    enabled: isAdmin,
  });

  const programInterests = Array.from(
    new Set(enquiries.map((e) => e.program_interest).filter(Boolean) as string[])
  ).sort();

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      notes,
    }: {
      id: string;
      status: string;
      notes: string;
    }) => {
      const update: Record<string, unknown> = { status, last_contacted_at: new Date().toISOString() };
      if (notes) update.notes = notes;
      const { error } = await supabase
        .from('enquiries')
        .update(update as any)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-new-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-in-progress'] });
      queryClient.invalidateQueries({ queryKey: ['admin-recent-enquiries'] });
      toast.success('Status updated');
      setStatusOpen(false);
      setNewStatus('');
      setStatusNotes('');
    },
    onError: (err: Error) =>
      toast.error('Failed to update status', { description: err.message }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-new-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-in-progress'] });
      queryClient.invalidateQueries({ queryKey: ['admin-recent-enquiries'] });
      toast.success('Enquiry deleted');
      setDeleteId(null);
    },
    onError: (err: Error) =>
      toast.error('Failed to delete', { description: err.message }),
  });

  const assignMutation = useMutation({
    mutationFn: async ({ id, assignedTo }: { id: string; assignedTo: string | null }) => {
      const { error } = await supabase
        .from('enquiries')
        .update({ assigned_to: assignedTo })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      toast.success('Enquiry assigned');
      setAssignOpen(false);
      setAssignId(null);
      setAssignTo('');
    },
    onError: (err: Error) =>
      toast.error('Failed to assign', { description: err.message }),
  });

  const filtered = enquiries.filter((e) => {
    const name = (e.full_name ?? '').toLowerCase();
    const email = (e.email ?? '').toLowerCase();
    const matchSearch =
      !search ||
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchProgram =
      programFilter === 'all' || e.program_interest === programFilter;
    return matchSearch && matchStatus && matchProgram;
  });

  const openView = (enquiry: EnquiryRow) => {
    setSelected(enquiry);
    setViewOpen(true);
  };

  const openStatus = (enquiry: EnquiryRow) => {
    setSelected(enquiry);
    setNewStatus(enquiry.status);
    setStatusNotes('');
    setStatusOpen(true);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        Loading enquiries...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Enquiries</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={programFilter} onValueChange={setProgramFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Program Interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            {programInterests.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Program Interest</TableHead>
              <TableHead>Budget Range</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.full_name}</TableCell>
                <TableCell>{e.email || '—'}</TableCell>
                <TableCell>{e.whatsapp || '—'}</TableCell>
                <TableCell>
                  <Badge variant="outline">{e.program_interest || '—'}</Badge>
                </TableCell>
                <TableCell>{e.budget_range || '—'}</TableCell>
                <TableCell>{e.timeline || '—'}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      statusColorMap[e.status] ||
                      'bg-gray-500 text-white hover:bg-gray-500'
                    }
                  >
                    {statusLabelMap[e.status] || e.status}
                  </Badge>
                </TableCell>
                <TableCell>{e.source || '—'}</TableCell>
                <TableCell>{formatDate(e.created_at)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openView(e)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openStatus(e)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAssignId(e.id);
                          setAssignTo(e.assigned_to ?? '');
                          setAssignOpen(true);
                        }}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setDeleteId(e.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center text-muted-foreground py-8"
                >
                  No enquiries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>{selected?.full_name}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="grid gap-3 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{selected.email || '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">{selected.whatsapp || '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge
                    className={
                      statusColorMap[selected.status] ||
                      'bg-gray-500 text-white'
                    }
                  >
                    {statusLabelMap[selected.status] || selected.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-muted-foreground">Program Interest</p>
                  <p className="font-medium">
                    {selected.program_interest || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Budget Range</p>
                  <p className="font-medium">
                    {selected.budget_range || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Timeline</p>
                  <p className="font-medium">{selected.timeline || '—'}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-muted-foreground">Nationality</p>
                  <p className="font-medium">
                    {selected.nationality || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Country of Residence</p>
                  <p className="font-medium">
                    {selected.country_of_residence || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Source</p>
                  <p className="font-medium">{selected.source || '—'}</p>
                </div>
              </div>
              {(selected.programs_of_interest ?? []).length > 0 && (
                <div>
                  <p className="text-muted-foreground">Programs of Interest</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(selected.programs_of_interest as string[]).map((p) => (
                      <Badge key={p} variant="outline">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {selected.referral_partner && (
                <div>
                  <p className="text-muted-foreground">Referral Partner</p>
                  <p className="font-medium">{selected.referral_partner}</p>
                </div>
              )}
              {selected.notes && (
                <div>
                  <p className="text-muted-foreground">Notes</p>
                  <p className="font-medium whitespace-pre-wrap">
                    {selected.notes}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {formatDate(selected.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Contacted</p>
                  <p className="font-medium">
                    {formatDate(selected.last_contacted_at)}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>
              Change status for {selected?.full_name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions
                    .filter((s) => s.value !== 'all')
                    .map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Textarea
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStatusOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                updateStatusMutation.mutate({
                  id: selected!.id,
                  status: newStatus,
                  notes: statusNotes,
                })
              }
              disabled={updateStatusMutation.isPending || !newStatus}
            >
              {updateStatusMutation.isPending
                ? 'Updating...'
                : 'Update Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Enquiry</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              enquiry from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Enquiry</DialogTitle>
            <DialogDescription>
              Assign this enquiry to a consultant or admin.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Assign To</Label>
            <Select value={assignTo} onValueChange={setAssignTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {adminUsers.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.name || u.email} ({u.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                assignMutation.mutate({
                  id: assignId!,
                  assignedTo: assignTo === 'unassigned' ? null : assignTo,
                })
              }
              disabled={assignMutation.isPending}
            >
              {assignMutation.isPending ? 'Assigning...' : 'Assign'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEnquiries;
