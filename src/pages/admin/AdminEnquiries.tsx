import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type EnquiryStatus = Database['public']['Enums']['enquiry_status'];

interface Enquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  nationality: string;
  residence: string;
  investment_budget: string;
  program_interest: string;
  enquiry: string | null;
  status: EnquiryStatus;
  notes: string | null;
  created_at: string;
}

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const fetchEnquiries = async () => {
    setLoading(true);
    let query = supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') {
      query = query.eq('status', filter as EnquiryStatus);
    }
    const { data, error } = await query;
    if (error) {
      toast.error(error.message);
    }
    setEnquiries((data as Enquiry[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, [filter]);

  const updateStatus = async (id: string, status: EnquiryStatus) => {
    const { error } = await supabase.from('contact_enquiries').update({ status }).eq('id', id);
    if (error) {
      toast.error(error.message);
    } else {
      fetchEnquiries();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-foreground">Contact Enquiries</h2>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : enquiries.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No enquiries found</TableCell></TableRow>
              ) : enquiries.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.first_name} {e.last_name}</TableCell>
                  <TableCell className="text-sm">{e.email}</TableCell>
                  <TableCell className="text-sm">{e.country_code} {e.phone}</TableCell>
                  <TableCell className="text-sm">{e.program_interest}</TableCell>
                  <TableCell className="text-sm">{e.investment_budget}</TableCell>
                  <TableCell>
                    <Select value={e.status} onValueChange={(v) => updateStatus(e.id, v as EnquiryStatus)}>
                      <SelectTrigger className="h-7 w-28 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(e.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEnquiries;
