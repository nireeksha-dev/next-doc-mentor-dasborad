import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MentorLayout } from "@/components/layout/MentorLayout";
import { Overview } from "@/pages/mentor/Overview";
import { Mentees } from "@/pages/mentor/Mentees";
import { Tasks } from "@/pages/mentor/Tasks";
import { Sessions } from "@/pages/mentor/Sessions";
import { Messages } from "@/pages/mentor/Messages";
import { Analytics } from "@/pages/mentor/Analytics";
import { Resources } from "@/pages/mentor/Resources";
import { Earnings } from "@/pages/mentor/Earnings";
import { Instagram } from "@/pages/mentor/Instagram";
import { InstagramGuidelines } from "@/pages/mentor/InstagramGuidelines";
import { Settings } from "@/pages/mentor/Settings";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentor" element={<MentorLayout><Overview /></MentorLayout>} />
          <Route path="/mentor/mentees" element={<MentorLayout><Mentees /></MentorLayout>} />
          <Route path="/mentor/tasks" element={<MentorLayout><Tasks /></MentorLayout>} />
          <Route path="/mentor/sessions" element={<MentorLayout><Sessions /></MentorLayout>} />
          <Route path="/mentor/messages" element={<MentorLayout><Messages /></MentorLayout>} />
          <Route path="/mentor/analytics" element={<MentorLayout><Analytics /></MentorLayout>} />
          <Route path="/mentor/resources" element={<MentorLayout><Resources /></MentorLayout>} />
          <Route path="/mentor/earnings" element={<MentorLayout><Earnings /></MentorLayout>} />
          <Route path="/mentor/instagram" element={<MentorLayout><Instagram /></MentorLayout>} />
          <Route path="/mentor/instagram/guidelines" element={<MentorLayout><InstagramGuidelines /></MentorLayout>} />
          <Route path="/mentor/settings" element={<MentorLayout><Settings /></MentorLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
