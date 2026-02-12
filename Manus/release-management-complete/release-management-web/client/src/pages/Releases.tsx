import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockStatuses, mockProjects } from "@/lib/mockData";
import { format } from "date-fns";
import { Search, Filter, MoreHorizontal, Calendar, User } from "lucide-react";
import NewReleaseDialog from "@/components/NewReleaseDialog";
import { useReleases } from "@/contexts/ReleasesContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditReleaseDialog from "@/components/EditReleaseDialog";
import DeleteReleaseDialog from "@/components/DeleteReleaseDialog";

export default function Releases() {
  const { releases } = useReleases();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filteredReleases = releases.filter(release => {
    const matchesSearch = release.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          release.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || release.statusId.toString() === statusFilter;
    const matchesProject = projectFilter === "all" || release.projectId.toString() === projectFilter;
    
    return matchesSearch && matchesStatus && matchesProject;
  });

  function getStatusBadgeColor(status: string) {
    switch (status) {
      case "Released": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Testing": return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
      case "In Progress": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Planning": return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
      case "Cancelled": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Releases</h1>
          <p className="text-muted-foreground mt-1">Manage and track all software releases</p>
        </div>
        <NewReleaseDialog />
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search releases..." 
                className="pl-9 bg-background border-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {mockStatuses.map(status => (
                    <SelectItem key={status.id} value={status.id.toString()}>{status.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {mockProjects.map(project => (
                    <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Releases List */}
      <div className="grid gap-4">
        {filteredReleases.length > 0 ? (
          filteredReleases.map((release) => (
            <Card key={release.id} className="border-none shadow-sm hover:shadow-md transition-all duration-200 group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {release.name}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(release.statusName)}`}>
                        {release.statusName}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{release.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Filter className="h-3 w-3" /> {release.projectName}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> {release.teamName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {format(new Date(release.releaseDate), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex">View Details</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setEditingId(release.id)}>
                          Edit Release
                        </DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setDeletingId(release.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No releases found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      {editingId && (
        <EditReleaseDialog 
          releaseId={editingId} 
          onClose={() => setEditingId(null)}
        />
      )}

      {/* Delete Dialog */}
      {deletingId && (
        <DeleteReleaseDialog 
          releaseId={deletingId} 
          onClose={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
