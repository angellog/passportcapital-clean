import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as SonnerToaster } from "sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import Compare from "@/pages/Compare";
import HowItWorks from "@/pages/HowItWorks";
import Services from "@/pages/Services";
import About from "@/pages/About";
import WhoWeServe from "@/pages/WhoWeServe";
import Partners from "@/pages/Partners";
import Insights from "@/pages/Insights";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import ResetPassword from "@/pages/ResetPassword";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminEnquiries from "@/pages/admin/AdminEnquiries";
import AdminPrograms from "@/pages/admin/AdminPrograms";
import AdminMedia from "@/pages/admin/AdminMedia";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <SonnerToaster richColors />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:id" element={<ProgramDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/who-we-serve" element={<WhoWeServe />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
                <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />
                <Route path="/admin/programs" element={<ProtectedRoute><AdminPrograms /></ProtectedRoute>} />
                <Route path="/admin/media" element={<ProtectedRoute requireAdmin><AdminMedia /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
