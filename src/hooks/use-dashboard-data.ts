// @ts-nocheck
import { useState, useEffect } from "react";
// Removed broken type import
import { mockChargingStation, mockMetrics, mockChartData, mockVariables } from "../data/mockData";

// HACK: Define placeholder types inline (you can shape these later)
type Variable = any;

export const useDashboardData = () => {
  const [data, setData] = useState({
    stations: [mockChargingStation],
    metrics: mockMetrics,
    chartData: mockChartData,
    variables: mockVariables,
    isLoading: true,
    isError: false
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(prev => ({ ...prev, isLoading: false }));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const updateVariable = (id: number, updates: Partial<Variable>) => {
    setData(prev => ({
      ...prev,
      variables: prev.variables.map(v =>
        v.id === id ? { ...v, ...updates } : v
      )
    }));
  };

  return {
    ...data,
    updateVariable,
    refetch: () => {
      setData(prev => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setData(prev => ({ ...prev, isLoading: false }));
      }, 500);
    }
  };
};
