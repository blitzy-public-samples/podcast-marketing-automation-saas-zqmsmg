import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryBar, VictoryPie, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory-native';
import { MobileAnalyticsDataPoint, MobileAnalyticsMetric, MobileOverallAnalytics } from '../../types/analytics';
import { formatDate, formatNumber } from '../../utils/formatters';

interface AnalyticsChartProps {
  data: MobileOverallAnalytics;
  metric: MobileAnalyticsMetric;
  chartType: 'line' | 'bar' | 'pie';
  timeRange: 'day' | 'week' | 'month' | 'year';
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, metric, chartType, timeRange }) => {
  const [formattedData, setFormattedData] = useState<{ x: Date; y: number }[]>([]);

  useEffect(() => {
    setFormattedData(formatChartData(data[metric], metric));
  }, [data, metric]);

  const formatChartData = (
    data: MobileAnalyticsDataPoint[],
    metric: MobileAnalyticsMetric
  ): { x: Date; y: number }[] => {
    return data
      .filter((point) => point.metric === metric)
      .map((point) => ({
        x: new Date(point.date),
        y: point.value,
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());
  };

  const handleDataFiltering = (): MobileAnalyticsDataPoint[] => {
    const now = new Date();
    const filteredData = data[metric].filter((point) => {
      const pointDate = new Date(point.date);
      switch (timeRange) {
        case 'day':
          return pointDate >= new Date(now.setDate(now.getDate() - 1));
        case 'week':
          return pointDate >= new Date(now.setDate(now.getDate() - 7));
        case 'month':
          return pointDate >= new Date(now.setMonth(now.getMonth() - 1));
        case 'year':
          return pointDate >= new Date(now.setFullYear(now.getFullYear() - 1));
        default:
          return true;
      }
    });
    return filteredData;
  };

  const renderChart = (): JSX.Element => {
    const filteredData = handleDataFiltering();
    const formattedData = formatChartData(filteredData, metric);

    switch (chartType) {
      case 'line':
        return (
          <VictoryLine
            data={formattedData}
            x="x"
            y="y"
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
          />
        );
      case 'bar':
        return (
          <VictoryBar
            data={formattedData}
            x="x"
            y="y"
            style={{
              data: { fill: "#c43a31" }
            }}
          />
        );
      case 'pie':
        return (
          <VictoryPie
            data={formattedData}
            x="x"
            y="y"
            colorScale="qualitative"
          />
        );
      default:
        return <Text>Unsupported chart type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        {renderChart()}
        <VictoryAxis
          tickFormat={(x) => formatDate(x)}
          style={{
            tickLabels: { angle: -45, textAnchor: 'end', fontSize: 8 }
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => formatNumber(y)}
          style={{
            tickLabels: { fontSize: 8 }
          }}
        />
        <VictoryTooltip
          flyoutStyle={{
            stroke: "#756f6a",
            fill: "white",
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default AnalyticsChart;

// TODO: Review the chart types and ensure they meet the specific requirements for mobile analytics visualization
// TODO: Validate that the component handles all possible MobileAnalyticsMetric types correctly
// TODO: Ensure that the chart component is optimized for mobile performance, especially with large datasets
// TODO: Consider adding more interactive features specific to mobile, such as pinch-to-zoom or swipe between time ranges