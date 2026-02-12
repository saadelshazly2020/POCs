import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ReleasesProvider } from "./contexts/ReleasesContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Releases from "./pages/Releases";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import History from "./pages/History";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/releases" component={Releases} />
        <Route path="/projects" component={Projects} />
        <Route path="/teams" component={Teams} />
        <Route path="/history" component={History} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ReleasesProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ReleasesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
