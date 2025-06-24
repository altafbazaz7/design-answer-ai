import { ChevronUp, Award, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BestScenarioResults = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const scenarios = [
    "The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
    "The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles."
  ];

  return (
    <Card className="card-dark border-dark-border mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Award className="h-5 w-5 accent-green" />
            <h2 className="text-lg font-semibold text-white">Best Scenario Results</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {scenarios.map((scenario, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-750 transition-colors duration-200"
                  >
                    <p className="text-sm text-gray-300 flex-1">{scenario}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white ml-4"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default BestScenarioResults;
