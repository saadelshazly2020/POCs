import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useReleases } from "@/contexts/ReleasesContext";

interface NewReleaseDialogProps {
  onReleaseAdded?: () => void;
}

export default function NewReleaseDialog({ onReleaseAdded }: NewReleaseDialogProps) {
  const { addRelease } = useReleases();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectId: "",
    teamId: "",
    statusId: "1",
    releaseDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Release name is required");
      return;
    }
    if (!formData.projectId) {
      toast.error("Please select a project");
      return;
    }
    if (!formData.teamId) {
      toast.error("Please select a team");
      return;
    }
    if (!formData.releaseDate) {
      toast.error("Please select a release date");
      return;
    }

    setIsLoading(true);
    
    try {
      const projectId = parseInt(formData.projectId);
      const teamId = parseInt(formData.teamId);
      const statusId = parseInt(formData.statusId);
      
      const newRelease = {
        name: formData.name,
        description: formData.description,
        projectId,
        projectName: mockProjects.find(p => p.id === projectId)?.name || "",
        teamId,
        teamName: mockTeams.find(t => t.id === teamId)?.name || "",
        statusId,
        statusName: mockStatuses.find(s => s.id === statusId)?.name || "",
        releaseDate: formData.releaseDate,
      };
      
      await addRelease(newRelease);
      
      toast.success(`Release "${formData.name}" created successfully!`);
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        projectId: "",
        teamId: "",
        statusId: "1",
        releaseDate: "",
      });
      
      if (onReleaseAdded) {
        onReleaseAdded();
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to create release";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Release
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Release</DialogTitle>
          <DialogDescription>
            Add a new release to track and manage
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
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Release"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
