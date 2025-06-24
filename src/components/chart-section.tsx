import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ChartDataPoint, TooltipData } from "../types/dashboard";
import { processChartData, formatChartValue } from "../lib/chart-data";
import DataPointTooltip from "./data-point-tooltip";

interface ChartSectionProps {
  chartData: ChartDataPoint[];
}

const ChartSection = ({ chartData }: ChartSectionProps) => {
  const [selectedMetric, setSelectedMetric] = useState("Unsatisfied Demand %");
  const [tooltipData, setTooltipData] = useState<TooltipData>({
    value: "",
    date: "",
    description: "",
    x: 0,
    y: 0,
    visible: false
  });

  const processedData = processChartData(chartData);

  const handleMouseLeave = () => {
    setTooltipData(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="lg:col-span-2">
      <Card className="card-dark border-dark-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Graphs</h3>
          
          {/* Graph Controls */}
          <div className="flex items-center justify-between mb-6">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-48 bg-gray-800 border-dark-border text-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-dark-border">
                <SelectItem value="Unsatisfied Demand %">Unsatisfied Demand %</SelectItem>
                <SelectItem value="Charging Growth">Charging Growth</SelectItem>
                <SelectItem value="Infrastructure Units">Infrastructure Units</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Interactive Chart Area */}
          <div className="relative h-80 bg-gray-900 rounded-lg p-4 chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={processedData}
                onMouseMove={(event: any) => {
                  if (event && event.activePayload && event.activePayload[0]) {
                    const data = event.activePayload[0].payload;
                    
                    setTooltipData({
                      value: formatChartValue(data.value),
                      date: `${data.date}, 2024`,
                      description: "Infrastructure Revenue",
                      x: (event.chartX || 0) + 20,
                      y: (event.chartY || 0) - 10,
                      visible: true
                    });
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => formatChartValue(value.toString())}
                />
                <Tooltip content={() => null} />
                <Line 
                  type="monotone" 
                  dataKey="numericValue" 
                  stroke="var(--accent-green)"
                  strokeWidth={3}
                  dot={{ 
                    fill: 'var(--accent-green)', 
                    strokeWidth: 0, 
                    r: 4
                  }}
                  activeDot={{ 
                    r: 6, 
                    fill: 'var(--accent-green)',
                    stroke: 'var(--accent-green)',
                    strokeWidth: 2
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
            
            <DataPointTooltip data={tooltipData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
