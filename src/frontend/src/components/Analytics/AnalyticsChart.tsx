import React from 'react';
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define prop types for the component
interface AnalyticsChartProps {
  chartType: 'line' | 'bar' | 'pie';
  data: any[];
  xKey: string;
  yKey: string;
  title?: string;
  color?: string;
}

// Helper function to format dates (placeholder implementation)
const formatDate = (date: string | number): string => {
  return new Date(date).toLocaleDateString();
};

// Helper function to format tooltip content
const formatTooltip = (value: any, name: string, props: any) => {
  if (typeof value === 'number') {
    return [value.toLocaleString(), name];
  }
  if (value instanceof Date) {
    return [formatDate(value), name];
  }
  return [value, name];
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chartType,
  data,
  xKey,
  yKey,
  title,
  color = '#8884d8'
}) => {
  // Validate input data
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Determine the chart component based on chartType
  const ChartComponent = {
    line: LineChart,
    bar: BarChart,
    pie: PieChart
  }[chartType];

  // Determine the data component based on chartType
  const DataComponent = {
    line: Line,
    bar: Bar,
    pie: Pie
  }[chartType];

  return (
    <div className="analytics-chart">
      {title && <h3 className="chart-title">{title}</h3>}
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            tickFormatter={value => typeof value === 'number' ? formatDate(value) : value}
          />
          <YAxis />
          <Tooltip formatter={formatTooltip} />
          <Legend />
          {chartType === 'pie' ? (
            <Pie
              data={data}
              dataKey={yKey}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill={color}
              label
            />
          ) : (
            <DataComponent type="monotone" dataKey={yKey} stroke={color} fill={color} />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;