import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Sidebar from "@/components/Sidebar";

const CampaignForm = lazy(() => import("@/components/CampaignForm"));
const GenerateMessage = lazy(() => import("@/pages/GenerateMessage"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <div className="md:flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <Routes>
              <Route
                path="/"
                element={
                  <SuspenseWrapper>
                    <Dashboard />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/campaigns/new"
                element={
                  <SuspenseWrapper>
                    <CampaignForm />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/campaigns/edit/:id"
                element={
                  <SuspenseWrapper>
                    <CampaignForm />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/generate-message"
                element={
                  <SuspenseWrapper>
                    <GenerateMessage />
                  </SuspenseWrapper>
                }
              />
            </Routes>
          </main>
        </div>
        <Toaster richColors closeButton />
      </div>
    </Router>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<>Loading...</>}>{children}</Suspense>;
}

export default App;
