import { useState, useEffect } from "react";
import { ChargingStation, KPIMetrics, ChartDataPoint, Variable } from "../types/dashboard";
import { mockChargingStation, mockMetrics, mockChartData, mockVariables } from "../data/mockData";

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
    // Simulate loading state
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
