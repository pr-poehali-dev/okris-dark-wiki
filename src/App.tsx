
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Lore from "./pages/Lore";
import Wiki from "./pages/Wiki";
import Shop from "./pages/Shop";
import Map from "./pages/Map";
import Online from "./pages/Online";
import Rules from "./pages/Rules";
import Contacts from "./pages/Contacts";
import Donate from "./pages/Donate";
import Nations from "./pages/Nations";
import NationDetail from "./pages/NationDetail";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile/:nickname" element={<Profile />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/map" element={<Map />} />
          <Route path="/online" element={<Online />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/nations" element={<Nations />} />
          <Route path="/nations/:nationId" element={<NationDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;