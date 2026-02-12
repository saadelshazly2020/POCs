import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockReleases, mockStatuses } from "@/lib/mockData";
import { Rocket, CheckCircle2, Clock, AlertCircle, Calendar } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { format } from "date-fns";

export default function Home() {
  // Calculate stats
  const totalReleases = mockReleases.length;
  const releasedCount = mockReleases.filter(r => r.statusName === "Released").length;
  const inProgressCount = mockReleases.filter(r => r.statusName === "In Progress" || r.statusName === "Testing").length;
  const planningCount = mockReleases.filter(r => r.statusName === "Planning").length;

  // Prepare chart data
  const statusData = mockStatuses.map(status => {
    const count = mockReleases.filter(r => r.statusId === status.id).length;
    return {
      name: status.name,
      count: count,
      color: getStatusColor(status.name)
    };
  }).filter(item => item.count > 0);

  function getStatusColor(status: string) {
    switch (status) {
      case "Released": return "var(--chart-5)"; // Green-ish
      case "Testing": return "var(--chart-4)"; // Teal-ish
      case "In Progress": return "var(--chart-2)"; // Blue-ish
      case "Planning": return "var(--chart-1)"; // Light Blue
      case "Cancelled": return "var(--destructive)";
      default: return "var(--muted-foreground)";
    }
  }

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
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10">
        <div className="absolute inset-0 bg-[url('/images/release-flow.png')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
        <div className="relative p-8 md:p-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Operations Command Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Track, manage, and deploy software releases across all your projects with precision and confidence.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Releases</CardTitle>
            <Rocket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{totalReleases}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all projects</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Released</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{releasedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully deployed</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground mt-1">In progress & testing</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Planning</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{planningCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Upcoming releases</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Releases List */}
        <Card className="col-span-1 lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading">Recent Activity</CardTitle>
            <CardDescription>Latest updates across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockReleases.slice(0, 5).map((release) => (
                <div key={release.id} className="flex items-start justify-between group">
                  <div className="flex gap-4">
                    <div className={`mt-1 p-2 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors`}>
                      <Rocket className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {release.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{release.projectName}</span>
                        <span>•</span>
                        <span>{format(new Date(release.releaseDate), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(release.statusName)}`}>
                    {release.statusName}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Chart */}
        <Card className="col-span-1 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading">Release Status</CardTitle>
            <CardDescription>Distribution of current releases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ 
                      backgroundColor: 'var(--popover)', 
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
