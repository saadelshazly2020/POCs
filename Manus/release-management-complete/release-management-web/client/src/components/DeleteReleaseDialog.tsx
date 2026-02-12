import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useReleases } from "@/contexts/ReleasesContext";
import { AlertTriangle } from "lucide-react";

interface DeleteReleaseDialogProps {
  releaseId: number;
  onClose: () => void;
}

export default function DeleteReleaseDialog({ releaseId, onClose }: DeleteReleaseDialogProps) {
  const { getReleaseById, deleteRelease } = useReleases();
  const release = getReleaseById(releaseId);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    
    try {
      await deleteRelease(releaseId);
      
      toast.success(`Release "${release?.name}" deleted successfully!`);
      onClose();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to delete release";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!release) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete Release</DialogTitle>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-foreground">
            Are you sure you want to delete <strong>{release.name}</strong>? This will permanently remove the release from the system.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Release"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
