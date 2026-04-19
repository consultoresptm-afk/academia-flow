import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, FileText, Loader2, Upload, Download } from "lucide-react";
import { toast } from "sonner";

const BUCKET = "trabajo-archivos";

const compressImage = async (file: File, maxWidth = 1920, quality = 0.8): Promise<File> => {
  if (!file.type.startsWith('image/')) return file;
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(file);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return resolve(file);
        // Rename ext to .jpg since we use image/jpeg
        const newName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
        resolve(new File([blob], newName, { type: 'image/jpeg' }));
      }, 'image/jpeg', quality);
    };
    img.onerror = () => resolve(file);
  });
};

export function ArchivosPanel({ trabajoId }: { trabajoId: string }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: archivos } = useQuery({
    enabled: !!user,
    queryKey: ["archivos", trabajoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trabajo_archivos")
        .select("*")
        .eq("trabajo_id", trabajoId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const handleUploadMultiple = async (files: FileList) => {
    if (!user || files.length === 0) return;
    setUploading(true);
    let successCount = 0;
    
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      try {
        // Compresión automática de imágenes
        if (file.type.startsWith('image/')) {
          file = await compressImage(file);
        }
        
        const path = `${user.id}/${trabajoId}/${Date.now()}-${file.name}`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file);
        if (upErr) throw upErr;
        
        const { error } = await supabase.from("trabajo_archivos").insert({
          user_id: user.id,
          trabajo_id: trabajoId,
          nombre: file.name,
          storage_path: path,
          tipo: file.type,
          tamanio: file.size,
        });
        if (error) throw error;
        successCount++;
      } catch (err: any) {
        toast.error(`Error subiendo ${file.name}: ${err.message}`);
      }
    }
    
    setUploading(false);
    if (successCount > 0) {
      toast.success(`${successCount} archivo(s) subido(s) correctamente`);
      qc.invalidateQueries({ queryKey: ["archivos", trabajoId] });
    }
  };

  const removeMutation = useMutation({
    mutationFn: async (a: { id: string; storage_path: string }) => {
      await supabase.storage.from(BUCKET).remove([a.storage_path]);
      const { error } = await supabase.from("trabajo_archivos").delete().eq("id", a.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Archivo eliminado");
      qc.invalidateQueries({ queryKey: ["archivos", trabajoId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const descargar = async (path: string, nombre: string) => {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60);
    if (error || !data) {
      toast.error("No se pudo generar el enlace");
      return;
    }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.download = nombre;
    a.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          multiple
          disabled={uploading}
          onChange={(e) => {
            if (e.target.files?.length) {
              handleUploadMultiple(e.target.files);
            }
            e.target.value = "";
          }}
          className="cursor-pointer"
        />
        {uploading && <Loader2 className="size-4 animate-spin text-muted-foreground shrink-0" />}
      </div>

      {archivos?.length ? (
        <div className="space-y-2">
          {archivos.map((a) => (
            <Card key={a.id} className="p-3 flex items-center gap-3">
              <FileText className="size-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{a.nombre}</div>
                <div className="text-xs text-muted-foreground">
                  {((a.tamanio ?? 0) / 1024).toFixed(1)} KB
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => descargar(a.storage_path, a.nombre)}>
                <Download className="size-4" />
              </Button>
              <Button size="sm" variant="ghost"
                onClick={() => removeMutation.mutate({ id: a.id, storage_path: a.storage_path })}>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-xs text-muted-foreground py-4 text-center border border-dashed rounded-md">
          <Upload className="size-4 mx-auto mb-1 opacity-50" />
          Sube PDFs, imágenes o documentos (Las imágenes se comprimirán automáticamente)
        </div>
      )}
    </div>
  );
}
