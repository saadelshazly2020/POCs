import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockReleases } from "@/lib/mockData";
import { format } from "date-fns";
import { History as HistoryIcon, GitCommit, Circle } from "lucide-react";

export default function History() {
  // Sort releases by date descending
  const sortedReleases = [...mockReleases].sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Release History</h1>
          <p className="text-muted-foreground mt-1">Timeline of all past deployment activities</p>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5 text-primary" />
            Timeline
          </CardTitle>
          <CardDescription>Chronological view of all releases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pl-8 border-l border-border space-y-8 py-4">
            {sortedReleases.map((release, index) => (
              <div key={release.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {format(new Date(release.releaseDate), "MMMM d, yyyy")}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(release.releaseDate), "h:mm a")}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold font-heading text-foreground group-hover:text-primary transition-colors">
                      {release.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm max-w-2xl">
                      {release.description}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
                        <GitCommit className="h-3 w-3" />
                        {release.projectName}
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
                        <Circle className="h-3 w-3 fill-current" />
                        {release.statusName}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                    <span className="font-medium">By:</span>
                    <span>{release.createdByUsername}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
