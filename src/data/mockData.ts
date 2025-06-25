import type { ChartDataPoint, KPIMetrics, Variable, ChargingStation } from "../types/dashboard";

export const mockChargingStation: ChargingStation = {
  id: 1,
  name: "Main Charging Hub",
  location: "Downtown District",
  totalPoles: 48,
  zones: 11,
  status: "active"
};

export const mockMetrics: KPIMetrics = {
  infrastructureUnits: "421.07",
  chargingGrowth: "33.07",
  localizationChange: "21.9",
  fleetGrowth: "7.03"
};

export const mockChartData: ChartDataPoint[] = [
  { id: 1, date: "Apr", value: "32000", metric: "revenue" },
  { id: 2, date: "May", value: "38000", metric: "revenue" },
  { id: 3, date: "Jun", value: "35000", metric: "revenue" },
  { id: 4, date: "Jul", value: "42000", metric: "revenue" },
  { id: 5, date: "Aug", value: "45000", metric: "revenue" },
  { id: 6, date: "Sep", value: "52000", metric: "revenue" },
  { id: 7, date: "Oct", value: "61000", metric: "revenue" }
];

export const mockVariables: Variable[] = [
  { id: 1, name: "Carbon-1", category: "Variable Category 1", description: "Carbon emissions tracking variable", isActive: true },
  { id: 2, name: "Co2 Distribution", category: "Variable Category 1", description: "Carbon dioxide distribution analysis", isActive: true },
  { id: 3, name: "Fleet sizing", category: "Variable Category 1", description: "Fleet size optimization parameter", isActive: true },
  { id: 4, name: "Parking Rate", category: "Variable Category 2", description: "Parking utilization rate", isActive: true },
  { id: 5, name: "Border Rate", category: "Variable Category 2", description: "Border crossing efficiency rate", isActive: true },
  { id: 6, name: "Broadcast rate", category: "Variable Category 2", description: "Communication broadcast rate", isActive: true },
  { id: 7, name: "Variable 1", category: "Variable Category 3", description: "General purpose variable 1", isActive: true },
  { id: 8, name: "Variable 2", category: "Variable Category 3", description: "General purpose variable 2", isActive: true },
  { id: 9, name: "Variable 3", category: "Variable Category 3", description: "General purpose variable 3", isActive: true }
];