import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Chatbot from "@/components/Chatbot";

// Home is eagerly loaded — it's the LCP page and first paint
import Home from "@/pages/Home";

// All other routes are lazy-loaded — only fetched when navigated to
const About       = lazy(() => import("@/pages/About"));
const Admissions  = lazy(() => import("@/pages/Admissions"));
const Academics   = lazy(() => import("@/pages/Academics"));
const Faculty     = lazy(() => import("@/pages/Faculty"));
const Gallery     = lazy(() => import("@/pages/Gallery"));
const Documents   = lazy(() => import("@/pages/Documents"));
const News        = lazy(() => import("@/pages/News"));
const Events      = lazy(() => import("@/pages/Events"));
const Contact     = lazy(() => import("@/pages/Contact"));
const NotFound    = lazy(() => import("@/pages/not-found"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/admissions" component={Admissions} />
            <Route path="/academics" component={Academics} />
            <Route path="/faculty" component={Faculty} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/documents" component={Documents} />
            <Route path="/news" component={News} />
            <Route path="/events" component={Events} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
