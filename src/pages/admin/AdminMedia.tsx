import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Trash2, Loader2, ImageIcon, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface StorageFile {
  name: string;
  folder: string;
  path: string;
  size: number;
  createdAt: string;
  publicUrl: string;
  inUse: boolean;
}

const AdminMedia = () => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'unused'>('all');
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const loadFiles = async () => {
    setLoading(true);
    setSelected(new Set());

    const { data: programs } = await supabase.from('programs').select('image');
    const usedUrls = new Set((programs || []).map((p) => p.image));

    const { data: folders } = await supabase.storage.from('program-images').list('', { limit: 1000 });
    const allFiles: StorageFile[] = [];

    if (folders) {
      for (const item of folders) {
        if (item.id) {
          const { data: urlData } = supabase.storage.from('program-images').getPublicUrl(item.name);
          allFiles.push({
            name: item.name,
            folder: '',
            path: item.name,
            size: item.metadata?.size || 0,
            createdAt: item.created_at || '',
            publicUrl: urlData.publicUrl,
            inUse: usedUrls.has(urlData.publicUrl),
          });
        } else {
          const { data: subFiles } = await supabase.storage
            .from('program-images')
            .list(item.name, { limit: 1000 });
          if (subFiles) {
            for (const f of subFiles) {
              if (!f.id) continue;
              const path = `${item.name}/${f.name}`;
              const { data: urlData } = supabase.storage.from('program-images').getPublicUrl(path);
              allFiles.push({
                name: f.name,
                folder: item.name,
                path,
                size: f.metadata?.size || 0,
                createdAt: f.created_at || '',
                publicUrl: urlData.publicUrl,
                inUse: usedUrls.has(urlData.publicUrl),
              });
            }
          }
        }
      }
    }

    setFiles(allFiles);
    setLoading(false);
  };

  useEffect(() => { loadFiles(); }, []);

  const filtered = useMemo(
    () => (filter === 'unused' ? files.filter((f) => !f.inUse) : files),
    [files, filter],
  );

  const toggleSelect = (path: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((f) => f.path)));
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const paths = Array.from(selected);
    const { error } = await supabase.storage.from('program-images').remove(paths);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Deleted ${paths.length} file(s)`);
    }
    setDeleting(false);
    setConfirmOpen(false);
    await loadFiles();
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Media Library</h2>
            <p className="text-sm text-muted-foreground">
              {files.length} file(s) • {files.filter((f) => !f.inUse).length} unused
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={loadFiles} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            {selected.size > 0 && (
              <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(true)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete {selected.size}
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(v) => v && setFilter(v as 'all' | 'unused')}
          >
            <ToggleGroupItem value="all" className="text-sm">All</ToggleGroupItem>
            <ToggleGroupItem value="unused" className="text-sm">Unused only</ToggleGroupItem>
          </ToggleGroup>
          {filtered.length > 0 && (
            <button
              onClick={toggleAll}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              {selected.size === filtered.length ? 'Deselect all' : 'Select all'}
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-2" />
            <p>{filter === 'unused' ? 'No unused images found' : 'No images uploaded yet'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((file) => (
              <Card
                key={file.path}
                className={`relative group overflow-hidden cursor-pointer transition-shadow ${
                  selected.has(file.path) ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => toggleSelect(file.path)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={file.publicUrl}
                      alt={file.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2">
                      <Checkbox
                        checked={selected.has(file.path)}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => toggleSelect(file.path)}
                      />
                    </div>
                    {file.inUse && (
                      <span className="absolute top-2 right-2 text-2xs px-1.5 py-0.5 rounded bg-primary/90 text-primary-foreground font-medium">
                        In use
                      </span>
                    )}
                    {!file.inUse && (
                      <span className="absolute top-2 right-2 text-2xs px-1.5 py-0.5 rounded bg-destructive/90 text-destructive-foreground font-medium">
                        Unused
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate text-foreground">{file.name}</p>
                    <p className="text-2xs text-muted-foreground">
                      {formatSize(file.size)}
                      {file.folder && ` • ${file.folder}`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {selected.size} image(s)?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Images currently in use by programs will become broken.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminMedia;
