import { useState } from "react";
import { X, Search, Play, Maximize, ChevronDown, Info, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Variable } from "../types/dashboard";
import VariableTag from "./variable-tag";


interface EditVariablesModalProps {
  isOpen: boolean;
  onClose: () => void;
  variables: Variable[];
  onUpdateVariable: (id: number, updates: Partial<Variable>) => void;
}

const EditVariablesModal = ({ isOpen, onClose, variables, onUpdateVariable }: EditVariablesModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    primary: false,
    secondary: false
  });
  const [selectedVariables, setSelectedVariables] = useState<Record<string, string[]>>({
    "Variable category 1": ["Carbon 1", "Co2 Distribution", "Fleet sizing"],
    "Variable Category 2": ["Parking loss", "Border Rate", "Request rate"],
    "Variable Category 3": ["Variable 1"]
  });
  const [newVariableName, setNewVariableName] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleRemoveVariable = (category: string, variableName: string) => {
    setSelectedVariables(prev => ({
      ...prev,
      [category]: prev[category]?.filter(name => name !== variableName) || []
    }));
  };

  const handleAddVariable = (category: string) => {
    if (newVariableName.trim()) {
      setSelectedVariables(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), newVariableName.trim()]
      }));
      setNewVariableName("");
      setActiveCategory(null);
    }
  };

  const getVariantForVariable = (variableName: string, category: string): 'green' | 'yellow' | 'gray' => {
    if (category === "Variable category 1") {
      if (variableName.includes("Co2") || variableName.includes("Carbon")) return 'green';
      if (variableName.includes("Fleet")) return 'yellow';
    }
    if (category === "Variable Category 3" && variableName === "Variable 1") {
      return Math.random() > 0.5 ? 'green' : 'gray';
    }
    return 'gray';
  };

  const toggleSection = (section: 'primary' | 'secondary') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-96 dashboard-dark border-l border-dark-border flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-border">
              <h2 className="text-lg font-semibold text-white">Edit Variables</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border-dark-border pl-10 focus:border-accent-green"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 hover:bg-gray-700 border-dark-border text-gray-300"
                >
                  <Maximize className="h-4 w-4 mr-2" />
                  AutoFit
                </Button>
                <Button size="sm" className="bg-accent-green hover:bg-accent-green/80 text-white">
                  <Play className="h-4 w-4 mr-2" />
                  Re-run
                </Button>
              </div>

              {/* Variable Categories */}
              <div className="space-y-6">
                {Object.entries(selectedVariables).map(([category, variableNames]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-300">{category}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                        className="text-gray-400 hover:text-accent-green"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      <AnimatePresence>
                        {variableNames.map((variableName, index) => (
                          <VariableTag
                            key={`${variableName}-${index}`}
                            name={variableName}
                            variant={getVariantForVariable(variableName, category)}
                            onRemove={() => handleRemoveVariable(category, variableName)}
                          />
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Add Variable Input */}
                    <AnimatePresence>
                      {activeCategory === category && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-2 mt-2">
                            <Input
                              type="text"
                              placeholder="Enter variable name"
                              value={newVariableName}
                              onChange={(e) => setNewVariableName(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleAddVariable(category)}
                              className="bg-gray-800 border-dark-border text-white placeholder-gray-400 flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleAddVariable(category)}
                              className="bg-accent-green hover:bg-accent-green/80 text-white"
                            >
                              Add
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setActiveCategory(null);
                                setNewVariableName("");
                              }}
                              className="text-gray-400 hover:text-white"
                            >
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* CO2 Distribution Info */}
                <Card className="bg-gray-800 border-dark-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-sm font-medium text-white">Co2 Distribution</h4>
                      <Info className="h-3 w-3 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400">
                      But what may data science speak to its virtuosity. It can be used as a scoring if anyone is monitoring utilizing a number of a website. The science has needs and lifestyle.
                    </p>
                  </CardContent>
                </Card>

                {/* Expandable Sections */}
                <div className="space-y-4">
                  {/* Primary Variables */}
                  <Card className="border-dark-border">
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 text-left hover:bg-gray-800"
                      onClick={() => toggleSection('primary')}
                    >
                      <span className="text-sm font-medium text-white">Primary Variables</span>
                      <motion.div
                        animate={{ rotate: expandedSections.primary ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </motion.div>
                    </Button>
                    <AnimatePresence>
                      {expandedSections.primary && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-4 pt-0">
                            <p className="text-sm text-gray-400">Primary variable configuration options...</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Secondary Variables */}
                  <Card className="border-dark-border">
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 text-left hover:bg-gray-800"
                      onClick={() => toggleSection('secondary')}
                    >
                      <span className="text-sm font-medium text-white">Secondary Variables</span>
                      <motion.div
                        animate={{ rotate: expandedSections.secondary ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </motion.div>
                    </Button>
                    <AnimatePresence>
                      {expandedSections.secondary && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0">
                            <p className="text-sm text-gray-400">Secondary variable configuration options...</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditVariablesModal;
