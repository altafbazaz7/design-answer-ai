export interface ChartDataPoint {
  id: number;
  date: string;
  value: string;
  metric: string;
}

export interface KPIMetrics {
  infrastructureUnits: string;
  chargingGrowth: string;
  localizationChange: string;
  fleetGrowth: string;
}

export interface ChargingStation {
  id: number;
  name: string;
  location: string;
  totalPoles: number;
  zones: number;
  status: string;
}

export interface Variable {
  id: number;
  name: string;
  category: string;
  description?: string;
  isActive: boolean;
}

export interface VariableCategory {
  name: string;
  variables: Variable[];
}

export interface TooltipData {
  value: string;
  date: string;
  description: string;
  x: number;
  y: number;
  visible: boolean;
}
