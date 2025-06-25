interface ChartDataPoint {
  id: number;
  date: string;
  value: string;
  metric: string;
}

export const formatChartValue = (value: string): string => {
  const num = parseFloat(value);
  if (num >= 1000) {
    return `€${(num / 1000).toFixed(0)}K`;
  }
  return `€${num.toFixed(0)}`;
};

export const processChartData = (data: ChartDataPoint[]) => {
  return data.map(point => ({
    ...point,
    formattedValue: formatChartValue(point.value),
    numericValue: parseFloat(point.value)
  }));
};

export const calculateChartDimensions = (containerWidth: number, containerHeight: number) => {
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;
  
  return { width, height, margin };
};

export const getYAxisTicks = (maxValue: number, tickCount: number = 5) => {
  const step = Math.ceil(maxValue / tickCount / 10000) * 10000;
  const ticks = [];
  
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(i * step);
  }
  
  return ticks;
};
