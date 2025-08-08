import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./lib/auth";
import Navbar from "./components/layout/navbar";
import Home from "./pages/home";
import Sports from "./pages/sports";
import Turfs from "./pages/turfs";
import Slots from "./pages/slots";
import Register from "./pages/register";
import Login from "./pages/login";
import MyBookings from "./pages/my-bookings";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sports" component={Sports} />
        <Route path="/turfs/:sport" component={Turfs} />
        <Route path="/slots/:turfId" component={Slots} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/my-bookings" component={MyBookings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
