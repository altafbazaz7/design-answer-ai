import { useState } from "react";
import { Info, Plus } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { KPIMetrics } from "../types/dashboard";
import { motion, AnimatePresence } from "framer-motion";

interface KPISectionProps {
  metrics?: KPIMetrics;
}

const KPISection = ({ metrics }: KPISectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedVariables, setSelectedVariables] = useState<string[]>([
    "Infrastructure Units", "Charging Growth"
  ]);

  const kpiCards = [
    {
      title: "Infrastructure Units",
      description: "The total number of charging units deployed in the infrastructure.",
      detailedInfo: "This metric tracks the cumulative count of all charging stations and individual charging points across the network. It includes both operational and planned infrastructure units.",
      value: `€${metrics?.infrastructureUnits || "0"}`,
      color: "text-white",
      isSelected: selectedVariables.includes("Infrastructure Units")
    },
    {
      title: "Charging Growth",
      description: "Percentage growth in EV charging activity over the past year.",
      detailedInfo: "Measures the year-over-year percentage increase in charging sessions, energy delivered, and unique users. This indicates market adoption and network utilization trends.",
      value: metrics?.chargingGrowth || "0",
      color: "accent-green",
      isSelected: selectedVariables.includes("Charging Growth")
    },
    {
      title: "Localization change",
      description: "The variation in spatial distribution of charging demand over time.",
      detailedInfo: "Analyzes how charging demand patterns shift geographically over time. Helps identify emerging hotspots and optimize future infrastructure placement.",
      value: `${metrics?.localizationChange || "0"}%`,
      color: "text-white",
      isSelected: selectedVariables.includes("Localization change")
    },
    {
      title: "Fleet growth",
      description: "The expansion rate of electric vehicle fleet in the service area.",
      detailedInfo: "Tracks the growth rate of registered electric vehicles in the coverage area. Essential for predicting future charging demand and capacity planning.",
      value: `${metrics?.fleetGrowth || "0"}%`,
      color: "accent-green",
      isSelected: selectedVariables.includes("Fleet growth")
    }
  ];

  const handleVariableSelect = (title: string) => {
    setSelectedVariables(prev => 
      prev.includes(title) 
        ? prev.filter(v => v !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="space-y-6">
      {/* KPI Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Key Performance Indicators</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Variables</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="space-y-4">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="relative">
            <Card
              className={`card-dark border-dark-border transition-all duration-200 cursor-pointer ${
                kpi.isSelected 
                  ? 'border-accent-green bg-gray-800/50' 
                  : 'hover:border-accent-green hover:bg-gray-800/30'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleVariableSelect(kpi.title)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-300">{kpi.title}</h4>
                  <div className="flex items-center space-x-2">
                    {kpi.isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-accent-green rounded-full"
                      />
                    )}
                    <Info className="h-3 w-3 text-gray-500" />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-3">{kpi.description}</div>
                <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
              </CardContent>
            </Card>

            {/* Hover Tooltip with Detailed Information */}
            <AnimatePresence>
              {hoveredCard === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full ml-4 top-0 z-50 w-80 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl"
                >
                  <div className="text-sm">
                    <h5 className="text-white font-semibold mb-2">{kpi.title}</h5>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {kpi.detailedInfo}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Current Value:</span>
                        <span className={`text-sm font-semibold ${kpi.color}`}>{kpi.value}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">Status:</span>
                        <span className={`text-xs ${kpi.isSelected ? 'text-green-400' : 'text-gray-400'}`}>
                          {kpi.isSelected ? 'Selected' : 'Available'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPISection;
