import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockTeams, mockReleases } from "@/lib/mockData";
import { Plus, Users, ArrowRight } from "lucide-react";

export default function Teams() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Teams</h1>
          <p className="text-muted-foreground mt-1">Manage teams and their assigned releases</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTeams.map((team) => {
          const teamReleases = mockReleases.filter(r => r.teamId === team.id);
          
          return (
            <Card key={team.id} className="border-none shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-secondary text-foreground mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="font-heading text-lg">{team.name}</CardTitle>
                <CardDescription className="line-clamp-2 h-10">{team.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Assigned Releases</p>
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {teamReleases.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-12 rounded-2xl overflow-hidden bg-card border border-border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="font-heading text-2xl font-bold mb-4">Collaboration is Key</h2>
            <p className="text-muted-foreground mb-6">
              Effective release management requires seamless coordination between Development, QA, and Operations teams. 
              Our platform brings everyone together in a single unified workflow.
            </p>
            <Button variant="outline" className="w-fit">Manage Permissions</Button>
          </div>
          <div className="bg-muted/30 min-h-[300px] relative">
             <div className="absolute inset-0 bg-[url('/images/team-collaboration.png')] bg-cover bg-center opacity-80 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
