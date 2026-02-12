import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockProjects, mockTeams, mockStatuses } from "@/lib/mockData";
import { toast } from "sonner";
import { useReleases } from "@/contexts/ReleasesContext";

interface EditReleaseDialogProps {
  releaseId: number;
  onClose: () => void;
}

export default function EditReleaseDialog({ releaseId, onClose }: EditReleaseDialogProps) {
  const { getReleaseById, updateRelease } = useReleases();
  const release = getReleaseById(releaseId);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectId: "",
    teamId: "",
    statusId: "",
    releaseDate: "",
  });

  useEffect(() => {
    if (release) {
      setFormData({
        name: release.name,
        description: release.description,
        projectId: release.projectId.toString(),
        teamId: release.teamId.toString(),
        statusId: release.statusId.toString(),
        releaseDate: release.releaseDate,
      });
    }
  }, [release]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Release name is required");
      return;
    }

    setIsLoading(true);
    
    try {
      
      const projectId = parseInt(formData.projectId);
      const teamId = parseInt(formData.teamId);
      const statusId = parseInt(formData.statusId);
      
      await updateRelease(releaseId, {
        name: formData.name,
        description: formData.description,
        projectId,
        projectName: mockProjects.find(p => p.id === projectId)?.name || "",
        teamId,
        teamName: mockTeams.find(t => t.id === teamId)?.name || "",
        statusId,
        statusName: mockStatuses.find(s => s.id === statusId)?.name || "",
        releaseDate: formData.releaseDate,
      });
      
      toast.success(`Release "${formData.name}" updated successfully!`);
      onClose();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to update release";
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Release</DialogTitle>
          <DialogDescription>
            Update release information
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Release Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Release 1.0.0"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the release..."
              value={formData.description}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project *</Label>
            <Select value={formData.projectId} onValueChange={(value) => handleSelectChange("projectId", value)}>
              <SelectTrigger id="project">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map(project => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team *</Label>
            <Select value={formData.teamId} onValueChange={(value) => handleSelectChange("teamId", value)}>
              <SelectTrigger id="team">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {mockTeams.map(team => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.statusId} onValueChange={(value) => handleSelectChange("statusId", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {mockStatuses.map(status => (
                  <SelectItem key={status.id} value={status.id.toString()}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseDate">Release Date *</Label>
            <Input
              id="releaseDate"
              name="releaseDate"
              type="datetime-local"
              value={formData.releaseDate}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Release"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
