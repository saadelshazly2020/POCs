import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockProjects, mockReleases } from "@/lib/mockData";
import { Plus, FolderGit2, ArrowRight } from "lucide-react";

export default function Projects() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Overview of all active projects and their release status</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => {
          const projectReleases = mockReleases.filter(r => r.projectId === project.id);
          const activeReleases = projectReleases.filter(r => r.statusName !== "Released" && r.statusName !== "Cancelled");
          const lastRelease = projectReleases
            .filter(r => r.statusName === "Released")
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())[0];

          return (
            <Card key={project.id} className="border-none shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary mb-4">
                    <FolderGit2 className="h-6 w-6" />
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="font-heading text-xl">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2 h-10">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active Releases</p>
                    <p className="text-2xl font-bold font-heading text-foreground">{activeReleases.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Releases</p>
                    <p className="text-2xl font-bold font-heading text-foreground">{projectReleases.length}</p>
                  </div>
                </div>
                
                {lastRelease && (
                  <div className="bg-muted/50 rounded-md p-3 text-sm">
                    <span className="text-muted-foreground">Latest: </span>
                    <span className="font-medium text-foreground">{lastRelease.name}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
