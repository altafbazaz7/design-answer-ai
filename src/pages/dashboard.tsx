// @ts-nocheck
import { useState } from "react";
import { BatteryCharging, History, Edit, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useDashboardData } from "../hooks/use-dashboard-data";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import BestScenarioResults from "../components/best-scenario-results";
import ChartSection from "../components/chart-section";
import KPISection from "../components/kpi-section";
import EditVariablesModal from "../components/edit-variables-modal";
import { Skeleton } from "../components/ui/skeleton";

const Dashboard = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { stations, metrics, chartData, variables, isLoading, isError, updateVariable } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex dashboard-dark">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <Header />
          <div className="p-6">
            <div className="space-y-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-96 w-full" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Skeleton className="h-80 w-full" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex dashboard-dark">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-400">Please try refreshing the page</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex dashboard-dark">
      <Sidebar />
      
      <main className="flex-1">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <BatteryCharging className="h-6 w-6 accent-green" />
              <h1 className="text-2xl font-semibold text-white">Charging Station</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 hover:bg-gray-700 border-dark-border text-gray-300"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
                className="bg-accent-green hover:bg-accent-green/80 text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Variables
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <BestScenarioResults />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ChartSection chartData={chartData} />
            <KPISection metrics={metrics} />
          </div>
        </div>
      </main>

      <EditVariablesModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        variables={variables}
        onUpdateVariable={updateVariable}
      />
    </div>
  );
};

export default Dashboard;
