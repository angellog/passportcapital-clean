import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { usePrograms, useCreateProgram, useUpdateProgram, useDeleteProgram, useSeedPrograms } from '@/hooks/usePrograms';
import { Program } from '@/data/programs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Plus, Pencil, Trash2, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const emptyProgram: Program = {
  id: '',
  country: '',
  region: 'caribbean',
  flag: '',
  minInvestment: 0,
  investmentType: '',
  processingTime: '',
  visaFreeCountries: 0,
  familyInclusion: true,
  dualCitizenship: true,
  physicalPresence: '',
  highlights: [],
  description: '',
  programType: 'citizenship',
  image: '',
};

const AdminPrograms = () => {
  const { data: programs = [], isLoading } = usePrograms();
  const createProgram = useCreateProgram();
  const updateProgram = useUpdateProgram();
  const deleteProgram = useDeleteProgram();
  const seedPrograms = useSeedPrograms();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program>(emptyProgram);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [keyBenefitsJson, setKeyBenefitsJson] = useState('');
  const [costBreakdownJson, setCostBreakdownJson] = useState('');
  const [eligibilityJson, setEligibilityJson] = useState('');
  const [requiredDocumentsJson, setRequiredDocumentsJson] = useState('');
  const [visaFreeJson, setVisaFreeJson] = useState('');
  const [faqsJson, setFaqsJson] = useState('');
  const [timelineJson, setTimelineJson] = useState('');
  const [highlightsText, setHighlightsText] = useState('');

  const openCreate = () => {
    setEditingProgram(emptyProgram);
    setIsNew(true);
    setKeyBenefitsJson('[]');
    setCostBreakdownJson('{}');
    setEligibilityJson('{}');
    setRequiredDocumentsJson('[]');
    setVisaFreeJson('[]');
    setFaqsJson('[]');
    setTimelineJson('[]');
    setHighlightsText('');
    setEditOpen(true);
  };

  const openEdit = (program: Program) => {
    setEditingProgram(program);
    setIsNew(false);
    setKeyBenefitsJson(JSON.stringify(program.keyBenefits || [], null, 2));
    setCostBreakdownJson(JSON.stringify(program.costBreakdown || {}, null, 2));
    setEligibilityJson(JSON.stringify(program.eligibility || {}, null, 2));
    setRequiredDocumentsJson(JSON.stringify(program.requiredDocuments || [], null, 2));
    setVisaFreeJson(JSON.stringify(program.visaFreeByRegion || [], null, 2));
    setFaqsJson(JSON.stringify(program.faqs || [], null, 2));
    setTimelineJson(JSON.stringify(program.timeline || [], null, 2));
    setHighlightsText((program.highlights || []).join('\n'));
    setEditOpen(true);
  };

  const handleSave = () => {
    try {
      const programToSave: Program = {
        ...editingProgram,
        highlights: highlightsText.split('\n').filter(Boolean),
        keyBenefits: JSON.parse(keyBenefitsJson || '[]'),
        costBreakdown: JSON.parse(costBreakdownJson || '{}'),
        eligibility: JSON.parse(eligibilityJson || '{}'),
        requiredDocuments: JSON.parse(requiredDocumentsJson || '[]'),
        visaFreeByRegion: JSON.parse(visaFreeJson || '[]'),
        faqs: JSON.parse(faqsJson || '[]'),
        timeline: JSON.parse(timelineJson || '[]'),
      };

      if (isNew) {
        createProgram.mutate(programToSave, { onSuccess: () => setEditOpen(false) });
      } else {
        updateProgram.mutate(programToSave, { onSuccess: () => setEditOpen(false) });
      }
    } catch (e: any) {
      toast.error('Invalid JSON in one of the advanced fields: ' + e.message);
    }
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteProgram.mutate(deletingId, { onSuccess: () => { setDeleteOpen(false); setDeletingId(null); } });
    }
  };

  const isSaving = createProgram.isPending || updateProgram.isPending;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Programs</h2>
            <p className="text-muted-foreground text-sm">Manage citizenship & residency programs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => seedPrograms.mutate()} disabled={seedPrograms.isPending}>
              {seedPrograms.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              Import Static Data
            </Button>
            <Button onClick={openCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add Program
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Min. Investment</TableHead>
                  <TableHead>Processing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">
                      <span className="mr-2">{p.flag}</span>
                      {p.country}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground capitalize">{p.region.replace('-', ' ')}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{p.programType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">${p.minInvestment.toLocaleString()}</TableCell>
                    <TableCell className="text-sm">{p.processingTime}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {p.comingSoon ? (
                          <Badge variant="secondary">Coming Soon</Badge>
                        ) : (
                          <Badge className="bg-green-600/20 text-green-700 border-green-600/30">Active</Badge>
                        )}
                        {p.isPopular && <Badge variant="secondary">Popular</Badge>}
                        {p.isNew && <Badge variant="secondary">New</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => { setDeletingId(p.id); setDeleteOpen(true); }}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Add Program' : `Edit ${editingProgram.country}`}</DialogTitle>
            <DialogDescription>
              {isNew ? 'Create a new citizenship or residency program.' : 'Update program details.'}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ID (slug)</Label>
                  <Input value={editingProgram.id} onChange={(e) => setEditingProgram({ ...editingProgram, id: e.target.value })} disabled={!isNew} placeholder="e.g. dominica" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input value={editingProgram.country} onChange={(e) => setEditingProgram({ ...editingProgram, country: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Flag Emoji</Label>
                  <Input value={editingProgram.flag} onChange={(e) => setEditingProgram({ ...editingProgram, flag: e.target.value })} placeholder="🇩🇲" />
                </div>
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select value={editingProgram.region} onValueChange={(v) => setEditingProgram({ ...editingProgram, region: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['caribbean', 'europe', 'middle-east', 'pacific', 'americas', 'africa', 'asia'].map(r => (
                        <SelectItem key={r} value={r} className="capitalize">{r.replace('-', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Program Type</Label>
                  <Select value={editingProgram.programType} onValueChange={(v) => setEditingProgram({ ...editingProgram, programType: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizenship">Citizenship</SelectItem>
                      <SelectItem value="residency">Residency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Min Investment ($)</Label>
                  <Input type="number" value={editingProgram.minInvestment} onChange={(e) => setEditingProgram({ ...editingProgram, minInvestment: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Investment Type</Label>
                  <Input value={editingProgram.investmentType} onChange={(e) => setEditingProgram({ ...editingProgram, investmentType: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Processing Time</Label>
                  <Input value={editingProgram.processingTime} onChange={(e) => setEditingProgram({ ...editingProgram, processingTime: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Visa-Free Countries</Label>
                  <Input type="number" value={editingProgram.visaFreeCountries} onChange={(e) => setEditingProgram({ ...editingProgram, visaFreeCountries: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Physical Presence</Label>
                  <Input value={editingProgram.physicalPresence} onChange={(e) => setEditingProgram({ ...editingProgram, physicalPresence: e.target.value })} />
                </div>
              </div>
              <ImageUpload
                value={editingProgram.image}
                onChange={(url) => setEditingProgram({ ...editingProgram, image: url })}
                programId={editingProgram.id}
              />
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editingProgram.description} onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input value={editingProgram.tagline || ''} onChange={(e) => setEditingProgram({ ...editingProgram, tagline: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Highlights (one per line)</Label>
                <Textarea value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Switch checked={editingProgram.familyInclusion} onCheckedChange={(v) => setEditingProgram({ ...editingProgram, familyInclusion: v })} />
                  <Label>Family Inclusion</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={editingProgram.dualCitizenship} onCheckedChange={(v) => setEditingProgram({ ...editingProgram, dualCitizenship: v })} />
                  <Label>Dual Citizenship</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={editingProgram.isCryptoFriendly || false} onCheckedChange={(v) => setEditingProgram({ ...editingProgram, isCryptoFriendly: v })} />
                  <Label>Crypto Friendly</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={editingProgram.isPopular || false} onCheckedChange={(v) => setEditingProgram({ ...editingProgram, isPopular: v })} />
                  <Label>Popular</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={editingProgram.isNew || false} onCheckedChange={(v) => setEditingProgram({ ...editingProgram, isNew: v })} />
                  <Label>New</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={editingProgram.comingSoon || false} onCheckedChange={(v) => setEditingProgram({ ...editingProgram, comingSoon: v })} />
                  <Label>Coming Soon</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Input value={editingProgram.timezone || ''} onChange={(e) => setEditingProgram({ ...editingProgram, timezone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Input value={editingProgram.language || ''} onChange={(e) => setEditingProgram({ ...editingProgram, language: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input value={editingProgram.currency || ''} onChange={(e) => setEditingProgram({ ...editingProgram, currency: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Population</Label>
                  <Input value={editingProgram.population || ''} onChange={(e) => setEditingProgram({ ...editingProgram, population: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Passport Validity</Label>
                  <Input value={editingProgram.passportValidity || ''} onChange={(e) => setEditingProgram({ ...editingProgram, passportValidity: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Legal Framework</Label>
                  <Input value={editingProgram.legalFramework || ''} onChange={(e) => setEditingProgram({ ...editingProgram, legalFramework: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>About Country</Label>
                <Textarea value={editingProgram.aboutCountry || ''} onChange={(e) => setEditingProgram({ ...editingProgram, aboutCountry: e.target.value })} rows={4} />
              </div>
            </TabsContent>

            <TabsContent value="investment" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Cost Breakdown (JSON)</Label>
                <Textarea value={costBreakdownJson} onChange={(e) => setCostBreakdownJson(e.target.value)} rows={12} className="font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label>Eligibility (JSON)</Label>
                <Textarea value={eligibilityJson} onChange={(e) => setEligibilityJson(e.target.value)} rows={6} className="font-mono text-xs" />
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Key Benefits (JSON)</Label>
                <Textarea value={keyBenefitsJson} onChange={(e) => setKeyBenefitsJson(e.target.value)} rows={8} className="font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label>Timeline (JSON)</Label>
                <Textarea value={timelineJson} onChange={(e) => setTimelineJson(e.target.value)} rows={8} className="font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label>FAQs (JSON)</Label>
                <Textarea value={faqsJson} onChange={(e) => setFaqsJson(e.target.value)} rows={8} className="font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label>Required Documents (JSON)</Label>
                <Textarea value={requiredDocumentsJson} onChange={(e) => setRequiredDocumentsJson(e.target.value)} rows={8} className="font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label>Visa-Free by Region (JSON)</Label>
                <Textarea value={visaFreeJson} onChange={(e) => setVisaFreeJson(e.target.value)} rows={8} className="font-mono text-xs" />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isNew ? 'Create' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Program</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this program? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleteProgram.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminPrograms;
