import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import VerifierPage from "./pages/VerifierPage";
import NotFound from "./pages/NotFound";
import StudentLogin from "./pages/StudentLogin";
import InstitutionLogin from "./pages/InstitutionLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              {/* Main landing page */}
              <Route path="/" element={<Landing />} />

              {/* Student Portal Routes */}
              <Route path="/student-portal" element={<StudentLogin />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />

              {/* Institution Portal Routes */}
              <Route path="/institution-portal" element={<InstitutionLogin />} />
              <Route path="/institution-dashboard" element={<InstitutionDashboard />} />

              {/* Verifier Page */}
              <Route path="/verify" element={<VerifierPage />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
